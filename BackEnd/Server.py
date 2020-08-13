from flask import Flask, request, abort, make_response, g, jsonify
import json
import uuid
import bcrypt
from flask_cors import CORS
import mysql.connector, mysql.connector.pooling

# local production development
pool = mysql.connector.pooling.MySQLConnectionPool(
    host="localhost",
    user="root",
    passwd="FUCKOFF8665",
    database="blog",
    buffered=True,
    pool_size=3
)

# AWS production development:
# pool = mysql.connector.pooling.MySQLConnectionPool(
#     pool_name="pool",
#     host="my-rds.cdl39yfkqbt1.us-east-1.rds.amazonaws.com",
#     port=3306,
#     user="admin",
#     passwd="password",
#     database="blog",
#     buffered=True,
#     pool_size=3
# )


# app = Flask(__name__,
#             static_folder='/home/ubuntu/build',
#             static_url_path='/')
#
app = Flask(__name__)
CORS(app)


@app.before_request
def before_request():
    g.db = pool.get_connection()


@app.teardown_request
def teardown_request(exception):
    g.db.close()

@app.route('/', methods=['GET'])
def index():
    return app.send_static_file("./index.html")

@app.route("/api/alive", methods=['GET'])
def alive():
    return "Alive!"

@app.route('/posts', methods=['GET', 'POST', 'PUT'])
def manage_posts():
    if request.method == 'GET':
        return get_all_posts()
    elif request.method == 'POST':
        return add_post()
    else:
        return update_post()


def update_post():
    data = request.get_json()
    query = "update posts set title=%s, content=%s, imageUrl=%s where id=%s"
    values = (data['title'], data['content'], data['imageUrl'], data['postId'])
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    new_post_id = cursor.lastrowid
    cursor.close()
    return 'Added' + str(new_post_id)


@app.route('/comments/<post_id>', methods=['GET'])
def get_comments(post_id):
    query = "select id, title, content, author, imageUrl, author_id, post_id from comments where post_id=%s"
    values = (post_id, )
    cursor = g.db.cursor()
    cursor.execute(query, values)
    records = cursor.fetchall()
    cursor.close()
    header = ['id', 'title', 'content', 'author', 'imageUrl', 'authorId', 'postId']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    return json.dumps(data)


@app.route('/comment', methods=['POST'])
def add_comment():
    data = request.get_json()
    query = "insert into comments (title, content, author, imageUrl, author_id, post_id) values (%s, %s, %s, %s, %s, %s)"
    values = (data['title'], data['content'], data['author'], data['imageUrl'], data['authorId'], data['postId'])
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()
    return "Comment added successfully!"


@app.route('/comment/edit', methods=['POST'])
def edit_comment():
    data = request.get_json()
    query_auth = "select author_id from comments where id=%s"
    values_auth = (data['commentId'],)
    cursor = g.db.cursor()
    cursor.execute(query_auth, values_auth)
    record = cursor.fetchone()
    if not record:
        cursor.close()
        abort(401)
    if str(record[0]) != str(data['loggedInUserId']):
        cursor.close()
        abort(403)
    query = "update comments set title=%s, content=%s, author=%s, imageUrl=%s where id=%s"
    values = (data['title'], data['content'], data['author'], data['imageUrl'], data['commentId'])
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()
    return "The comment was edited Successfully!"


@app.route('/editPost', methods=['POST'])
def edit_post():
    post = request.get_json()
    query_auth = "select id from posts where author_id=%s"
    values_auth = (post['userId'],)
    cursor = g.db.cursor()
    cursor.execute(query_auth, values_auth)
    record = cursor.fetchall()
    if not record:
        cursor.close()
        abort(401)
    query = "update posts set imageUrl=%s, title=%s, content=%s, author=%s where id=%s"
    values = (post['imageUrl'], post['title'], post['content'], post['author'], post['id'])
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()
    return "The post was edited Successfully!"


@app.route('/deletePost', methods=['POST'])
def delete_post():
    post = request.get_json()
    query_auth = "select author_id from posts where id=%s"
    values_auth = (post['id'], )
    cursor = g.db.cursor()
    cursor.execute(query_auth, values_auth)
    record = cursor.fetchone()
    cursor.close()
    if not record:
        abort(401)
    if str(record[0]) != str(post['authorId']):
        abort(403)
    query_tags = "delete from tags where post_id=%s"
    cursor = g.db.cursor()
    cursor.execute(query_tags,values_auth)
    cursor.close()

    cursor = g.db.cursor()
    query_delete_comments = "delete from comments where post_id=%s"
    values_delete_comments = (post['id'],)
    cursor.execute(query_delete_comments, values_delete_comments)
    g.db.commit()
    cursor.close()
    query_delete_post = "delete from posts where id=%s"
    values_delete_post = (post['id'],)
    cursor = g.db.cursor()
    cursor.execute(query_delete_post, values_delete_post)
    g.db.commit()
    cursor.close()
    return "deleted post successfully!"


@app.route('/comment/delete', methods=['POST'])
def delete_comment():
    data = request.get_json()
    comment_id = data['commentId']
    logged_in_user_id = data['loggedInUserId']
    query_auth = "select author_id from comments where id=%s"
    values_auth = (comment_id,)
    cursor = g.db.cursor()
    cursor.execute(query_auth, values_auth)
    record = cursor.fetchone()
    if not record:
        cursor.close()
        abort(401)
    if str(record[0]) != str(logged_in_user_id):
        cursor.close()
        abort(401)
    query_delete = "delete from comments where id=%s"
    values_delete = (comment_id,)
    cursor.execute(query_delete, values_delete)
    g.db.commit()
    cursor.close()
    return "deleted post successfully!"


@app.route('/post/<id>', methods=['GET'])
def get_post(id):
    query = "select id, title, content, imageUrl, author, author_id from posts where id = %s"
    values = [str(id)]
    cursor = g.db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    header = ['id', 'title', 'content', 'imageUrl', 'author', "authorId"]
    json_answer = json.dumps(dict(zip(header, record)))
    return json_answer


@app.route('/post/<post_id>/tags', methods=['GET','POST'])
def manage_tags(post_id):
    if request.method == 'POST':
        return add_tags(post_id)
    else:
        get_all_tags(post_id)


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    password = data['password']
    nickname = data['nickname']
    cursor = g.db.cursor()
    exists_query = "select id from users where username = %s"
    exists_values = (username, )
    cursor.execute(exists_query, exists_values)
    record_exists = cursor.fetchone()
    if record_exists:
        cursor.close()
        abort(401)
    insert_query = 'insert into users (username, password, nickname) values (%s, %s, %s)'
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    insert_values = (username, hashed_password, nickname)
    cursor.execute(insert_query, insert_values)
    g.db.commit()
    cursor.close()

    query_id = "select id from users where username=%s"
    values_id = (username, )
    cursor = g.db.cursor()
    cursor.execute(query_id, values_id)
    user_id = cursor.fetchone()[0]
    cursor.close()
    session_id = str(uuid.uuid4())
    response = make_response()
    response.set_cookie("session_id", session_id)
    response = {"userId": user_id}
    return response


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    cursor = g.db.cursor()
    # check if the username exists
    existsQuery = "select id, username, password, nickname from users where username = %s"
    existsValues = (username,)
    cursor.execute(existsQuery, existsValues)
    recordExists = cursor.fetchone()
    if not recordExists:
        cursor.close()
        abort(401)

    passwordFromDB = recordExists[2].encode('utf-8')
    if bcrypt.hashpw(password.encode('utf-8'), passwordFromDB) != passwordFromDB:
        cursor.close()
        abort(403)
    # sessions part of the code
    session_id = str(uuid.uuid4())
    user_id = recordExists[0]
    nickname = recordExists[3]
    sessionQuery = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id = %s"
    sessionValues = (user_id, session_id, session_id)
    cursor.execute(sessionQuery, sessionValues)
    g.db.commit()
    user_data = {"userId": user_id, "nickname": nickname}
    response = make_response(user_data)
    response.set_cookie("session_id", session_id)
    cursor.close()
    return response


@app.route('/getUserId/<username>', methods=['GET'])
def getUserId(username):
    cursor = g.db.cursor()
    # check if the username exists
    existsQuery = "select id from users where username = %s"
    existsValues = (username,)
    cursor.execute(existsQuery, existsValues)
    recordExists = cursor.fetchone()
    if not recordExists:
        abort(401)
    id = recordExists[0]
    cursor.close()
    jsonId = {'id': id}
    return jsonId


@app.route('/randomText/logout/<id>', methods=['POST'])
def logout(id):
    # const future_id = validate_sessions()
    data = request.get_json();
    validation_query = "select username from users where id=%s"
    validation_values = (data['loggedInUserId'], )
    cursor = g.db.cursor()
    cursor.execute(validation_query, validation_values)
    record = cursor.fetchone()
    cursor.close()
    if not record:
        abort(401)
    if record[0] != data['username']:
        abort(403)
    query = "delete from sessions where user_id = %s"
    values = (id,)
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    cursor.close()
    return "deleted from the database"


def get_all_tags(post_id):
        print("1")
        query = "select id, name, post_id from tags where post_id=%s"
        value = (post_id,)
        cursor = g.db.cursor()
        cursor.execute(query, value)
        records = cursor.fetchall()
        print("2")
        if not records:
            print("not records")
            cursor.close()
            return []
        header = ['id', 'name', 'post_id']
        data = []
        print("3")
        for r in records:
            data.append(dict(zip(header, r)))
        cursor.close()
        print("4")
        print(json.dumps(data))
        return jsonify(data=data)


def add_tags(post_id):
    data = request.get_json()
    print("TODO - NEED TO IMPLEMENT ADD_TAGS()")
    return "TODO - NEED TO IMPLEMENT ADD_TAGS()"


def add_post():
    data = request.get_json()
    query = "insert into posts (title, content, author, imageUrl, author_id) values (%s, %s, %s, %s, %s)"
    values = (data['title'], data['content'], data['author'], data['imageUrl'], data['loggedInUserId'])
    cursor = g.db.cursor()
    cursor.execute(query, values)
    g.db.commit()
    new_post_id = cursor.lastrowid
    cursor.close()
    return 'Added' + str(new_post_id)


def get_all_posts():
    query = "select id, title, content, imageUrl, author, author_id from posts"
    cursor = g.db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    header = ['id', 'title', 'content', 'imageUrl', 'author', 'authorId']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    return json.dumps(data)


if __name__ == "__main__":
    app.run()