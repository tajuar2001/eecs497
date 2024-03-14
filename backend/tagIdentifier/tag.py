from flask import Flask, request, jsonify, Blueprint, session
from flask_sqlalchemy import SQLAlchemy
from gensim.models import Word2Vec, KeyedVectors
import numpy as np
from userAuth.auth import db, User
from sklearn.feature_extraction.text import TfidfVectorizer

tag_bp = Blueprint('tags', __name__)

class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    user = db.relationship('User', backref=db.backref('tags', lazy=True))

tfidf_vectorizer = TfidfVectorizer()

def generate_tags_from_text(text, top_n=5):
    corpus = [text]
    vectorizer = TfidfVectorizer(stop_words='english', use_idf=True, lowercase=True, norm='l2')
    tfidf_matrix = vectorizer.fit_transform(corpus)
    feature_names = vectorizer.get_feature_names_out()
    tfidf_scores = tfidf_matrix.toarray()[0]  # Convert sparse matrix to dense and get the first document scores

    sorted_indices = np.argsort(tfidf_scores)[::-1]
    top_features = [(feature_names[i], tfidf_scores[i]) for i in sorted_indices[:top_n]]

    return [word for word, score in top_features]

def add_tag_to_user(text):
    tags = generate_tags_from_text(text)
    for tag_name in tags:
        # Check if the user already has this tag
        tag = Tag.query.filter_by(name=tag_name, user_id=session["user_id"]).first()
        if not tag:
            # Create a new tag and associate it with the user
            tag = Tag(name=tag_name, user_id=session["user_id"])
            print(tag_name)
            db.session.add(tag)
            db.session.commit()

@tag_bp.route('/recommendations/<int:post_id>', methods=['GET'])
def get_recommendations(post_id):
    k = request.args.get('k')
    return jsonify(k)

@tag_bp.route('/user/tags', methods=['GET'])
def get_user_tags():

    user_id = session["user_id"]
    # Get tags associated with the user
    tags = db.session.query(Tag).filter(Tag.user_id == user_id).all()
    tag_list = [{'id': tag.id, 'name': tag.name} for tag in tags]
    return jsonify(tag_list), 200

