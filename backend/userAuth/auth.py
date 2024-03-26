from flask import jsonify, send_file, Blueprint, request, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from io import BytesIO

auth_routes = Blueprint('auth_routes', __name__)
db = SQLAlchemy()

DEFAULT_PROFILE_PICTURE_PATH = "./userAuth/noPhoto.png"

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

def validate_user_credentials(username, password):
    user = User.query.filter_by(username=username).first()
    return user and user.check_password(password)

def create_user(username, password, profile_picture):
    new_user = User(username=username, profile_picture=profile_picture)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

def get_default_profile_picture():
    return open(DEFAULT_PROFILE_PICTURE_PATH, 'rb').read()

@auth_routes.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    profile_picture = request.files.get('profile_picture')

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 409

    profile_picture_data = profile_picture.read() if profile_picture else get_default_profile_picture()
    create_user(username, password, profile_picture_data)

    return jsonify({'message': 'User created successfully'}), 201

@auth_routes.route('/login', methods=['GET', 'POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    if validate_user_credentials(username, password):
        user = User.query.filter_by(username=username).first()
        session['user_id'] = user.id
        session.permanent = True
        return jsonify({'message': 'Logged in successfully', 'name': user.username, 'id': user.id}), 200

    return jsonify({'message': 'Invalid username or password'}), 401

@auth_routes.route('/logout', methods=["POST"])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@auth_routes.route('/loggedIn', methods=["GET"])
def is_logged_in():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        return jsonify({'message': 'Already logged in!', 'name': user.username}), 200
    else:
        return jsonify({'message': 'No user currently logged in'}), 401

@auth_routes.route('/profile_picture/<int:user_id>', methods=['GET'])
def retrieve_profile_picture(user_id):
    user = User.query.get(user_id)
    if user and user.profile_picture:
        return send_file(BytesIO(user.profile_picture), mimetype='image/jpeg')
    return '', 404