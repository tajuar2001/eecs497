from flask import Flask, Blueprint, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from userAuth.auth import db
from userAuth.auth import User
from datetime import datetime

class Kid(db.Model):
    __tablename__ = 'kid'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    parent = db.relationship('User', backref=db.backref('kids', lazy=True))

kid_routes = Blueprint('kid_routes', __name__)

@kid_routes.route('/kids', methods=['GET'])
def get_kids():
    kids = Kid.query.filter_by(parent_id=session["user_id"]).all()
    kid_list = [{'id': kid.id, 'name': kid.name, 'birthday': kid.birthday.strftime('%Y-%m-%d')} for kid in kids]
    return jsonify(kid_list), 200

@kid_routes.route('/kids', methods=['POST'])
def add_kid():
    data = request.json
    name = data['name']
    # Parse the birthday string into a date object
    birthday = datetime.strptime(data['birthday'], '%Y-%m-%d').date() # Convert string to date
    new_kid = Kid(name=name, birthday=birthday, parent_id=session["user_id"])
    db.session.add(new_kid)
    db.session.commit()
    return jsonify({'message': 'Kid added successfully'}), 201