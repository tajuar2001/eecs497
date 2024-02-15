from flask import Blueprint, request, jsonify, session
from userAuth.auth import db

# Define models
class AdvicePost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(1024), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comments = db.relationship('Comment', backref='advice_post', lazy=True)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1024), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    advice_post_id = db.Column(db.Integer, db.ForeignKey('advice_post.id'), nullable=False)

# Blueprint for advice posts
advice_posts_bp = Blueprint('advice_posts', __name__)

@advice_posts_bp.route('/advice', methods=['POST'])
def create_advice_post():
    data = request.get_json()
    new_post = AdvicePost(question=data['question'], user_id=session['user_id'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Advice post created', 'id': new_post.id}), 201

@advice_posts_bp.route('/advice', methods=['GET'])
def get_advice_posts():
    posts = AdvicePost.query.all()
    all_posts = [{'id': post.id, 'question': post.question, 'user_id': post.user_id} for post in posts]
    return jsonify(all_posts)

@advice_posts_bp.route('/advice/<int:post_id>/comment', methods=['POST'])
def post_comment(post_id):
    data = request.get_json()
    new_comment = Comment(content=data['content'], user_id=session['user_id'], advice_post_id=post_id)
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({'message': 'Comment added', 'post_id': post_id, 'comment_id': new_comment.id}), 201
