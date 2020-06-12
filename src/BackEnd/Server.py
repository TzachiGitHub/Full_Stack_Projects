from flask import Flask, request, abort, make_response
from flask_cors import CORS
import mysql.connector as mysql
import json
import re
import uuid

db = mysql.connect(
	host = "localhost",
	user = "root",
	password = "FUCKOFF8665",
	database = "blog"
	)
print(db)

app = Flask(__name__)
CORS(app)

@app.route('/posts', methods=['GET', 'POST'])
def manage_posts():
	if request.method == 'GET':
		return get_all_posts()
	else:
		return add_post()

@app.route('/post/<id>', methods=['GET'])
def getPost(id):
	query = "select id, title, content, linkDescription, imageUrl from posts where id = %s"
	values = (id,)
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	header = ['id', 'title', 'content', 'linkDescription', 'imageUrl']
	jsonAnswer = json.dumps(dict(zip(header, record)))

	return jsonAnswer


@app.route('/signup', methods=['POST'])
def signup():
	msg = ''
	data = request.get_json()
	username = data['username']
	password = data['password']
	curser = db.cursor()
	existsQuery = "select id from users where username = %s"
	existsValues = (username,)
	curser.execute(existsQuery, existsValues)
	recordExists = curser.fetchone()
	if recordExists:
		abort(401)
	else:
		insertQuery = 'insert into users (username, password) values (%s, %s)'
		insertValues = (username, password)
		curser.execute(insertQuery, insertValues)
		db.commit()
		curser.close()
		session_id = str(uuid.uuid4())
		response = make_response()
		response.set_cookie("session_id", session_id)
		return response


@app.route('/login', methods=['POST'])
def login():
	data = request.get_json()
	username = data['username']
	password = data['password']
	curser = db.cursor()
	# check if the username exists
	existsQuery = "select id, username, password from users where username = %s"
	existsValues = (username,)
	curser.execute(existsQuery, existsValues)
	recordExists = curser.fetchone()
	if not recordExists:
		abort(401)

	samePasswordQuery = "select id from users where username = %s and password = %s"
	samePasswordValues = (username, password)
	curser.execute(samePasswordQuery, samePasswordValues)
	correctPassword = curser.fetchone()
	if not correctPassword:
		abort(403)
	# sessions part of the code
	session_id = str(uuid.uuid4())
	user_id = recordExists[0]
	sessionQuery = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id = %s"
	sessionValues = (user_id, session_id, session_id)
	curser.execute(sessionQuery, sessionValues)
	db.commit()
	response = make_response()
	response.set_cookie("session_id", session_id)
	return response


def add_post():
	data = request.get_json()
	query = "insert into posts (title, content, published, imageUrl, linkDescription) values (%s, %s, %s, %s, %s)"
	values = (data['title'], data['content'], data['published'], data['imageUrl'], data['linkDescription'])
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	new_post_id = cursor.lastrowid
	cursor.close()
	return 'Added' + str(new_post_id)


def get_all_posts():
	query = "select id, title, content, linkDescription, imageUrl from posts"
	cursor = db.cursor()
	cursor.execute(query)
	records = cursor.fetchall()
	cursor.close()
	header = ['id', 'title', 'content', 'linkDescription', 'image']
	data = []
	for r in records:
		data.append(dict(zip(header, r)))
	return json.dumps(data)



if __name__ == "__main__":
	app.run()
