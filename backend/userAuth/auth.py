from flask import jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
from flask import Blueprint, jsonify, request, session
from werkzeug.security import generate_password_hash, check_password_hash
from io import BytesIO
auth_routes = Blueprint('auth_routes', __name__)

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    profile_picture = db.Column(db.LargeBinary) 
    advice_posts = db.relationship('AdvicePost', backref='author', lazy=True)
    comments = db.relationship('Comment', backref='comment_author', lazy=True)
    replies = db.relationship('Reply', backref='reply_author', lazy=True)
    communities = db.relationship('Community', secondary='community_membership', backref='members', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@auth_routes.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    profile_picture = request.files.get('profile_picture')

    print("for register:")
    print("Username: " + username + ", pswd: " + password)
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 409

    if profile_picture:
        # Read the file data
        profile_picture_data = profile_picture.read()
    else:
        profile_picture_data = None

    new_user = User(username=username, profile_picture=profile_picture_data)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@auth_routes.route('/login', methods=['GET','POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()
    print("for login:")
    print("Username: " + username + ", pswd: " + password)
    print("hashed password: " + generate_password_hash(password))
    if user and user.check_password(password):
        session['user_id'] = user.id  # You can use Flask sessions or JWT tokens for maintaining session
        print(user.id)
        session.permanent = True
        return jsonify({'message': 'Logged in successfully', 'name': user.username, 'id': user.id}), 200
    return jsonify({'message': 'Invalid username or password'}), 401

@auth_routes.route('/logout', methods=["POST"])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@auth_routes.route('/loggedIn', methods=["GET"])
def isLoggedIn():
    if (session.get('user_id', None)):
        uname = User.query.filter_by(id=session['user_id']).first().username
        print("alr logged in")
        return jsonify({'message': 'Already logged in!', 'name': uname}), 200
    else:
        return jsonify({'message': 'No user currently logged in'}), 401

@auth_routes.route('/profile_picture/<int:user_id>', methods=['GET'])
def retrieve_profile(user_id):
    user = User.query.get(user_id)
    if user and user.profile_picture:
        return send_file(BytesIO(user.profile_picture), mimetype='image/jpeg')
    return '', 404
