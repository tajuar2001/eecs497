from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import Blueprint, jsonify, request, session
from werkzeug.security import generate_password_hash, check_password_hash
auth_routes = Blueprint('auth_routes', __name__)

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()
class User(db.Model):
   
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@auth_routes.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']
    # Check if user exists
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 409
    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@auth_routes.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        session['user_id'] = user.id  # You can use Flask sessions or JWT tokens for maintaining session
        return jsonify({'message': 'Logged in successfully'})
    return jsonify({'message': 'Invalid username or password'}), 401

@auth_routes.route('/logout')
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'})
