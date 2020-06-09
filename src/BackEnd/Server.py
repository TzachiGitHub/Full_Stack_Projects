from flask import Flask, request
from flask_cors import CORS
import mysql.connector as mysql
import json
import re

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

@app.route('/signup', methods=['POST'])
def signin():
	msg = ''
	data = request.get_json()
	username = data['username']
	password = data['password']
	curser = db.cursor()
	existsQuery = "select id from users where username = %s"
	existsValues = (username,)
	curser.execute(existsQuery,existsValues)
	recordExists = curser.fetchone()
	if recordExists:
		msg = 'the username is already taken - please choose another'
	elif not re.match(r'[A-Za-z0-9]+', username):
		msg = 'The username must contain only characters and numbers, please choose another username'
	else:
		insertQuery = 'insert into users (username, password) values (%s, %s)'
		insertValues = (username, password)
		curser.execute(insertQuery, insertValues)
		db.commit()
		msg = 'You have Successfully signed up!'
	return msg

def add_post():
	data = request.get_json()
	print(data)
	print("here")
	query = "insert into posts (title, content) values (%s, %s)"
	values = (data['title'], data['content'])
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	new_post_id = cursor.lastrowid
	cursor.close()
	return 'Added' + str(new_post_id)


def get_all_posts():
	query = "select id, title, content from posts"
	cursor = db.cursor()
	cursor.execute(query)
	records = cursor.fetchall()
	cursor.close()
	print(records)
	header = ['id', 'title', 'content']
	data = []
	for r in records:
		data.append(dict(zip(header, r)))
	return json.dumps(data)



if __name__ == "__main__":
	app.run()
