from flask import Blueprint, request, jsonify, session
from userAuth.auth import db
from userAuth.auth import User
from tagIdentifier.tag import add_tag_to_user

# Models
class AdvicePost(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(1024), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comments = db.relationship('Comment', backref='advice_post', lazy=True)
    replies = db.relationship('Reply', backref='advice_post', lazy=True)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.String(1024), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    advice_post_id = db.Column(db.Integer, db.ForeignKey('advice_post.id'), nullable=False)

# Reply model
class Reply(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.String(1024), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    advice_post_id = db.Column(db.Integer, db.ForeignKey('advice_post.id'), nullable=False)

advice_posts_bp = Blueprint('advice_posts', __name__)

@advice_posts_bp.route('/advice', methods=['POST'])
def create_advice_post():
    data = request.get_json()
    new_post = AdvicePost(question=data['question'], user_id=session['user_id'])
    db.session.add(new_post)
    db.session.commit()
    add_tag_to_user(data['question'], session['user_id'])
    return jsonify({'message': 'Advice post created', 'id': new_post.id}), 201

@advice_posts_bp.route('/advice/<int:post_id>/reply', methods=['POST'])
def post_reply(post_id):
    data = request.get_json()
    new_reply = Reply(text=data['text'], user_id=session['user_id'], advice_post_id=post_id)
    db.session.add(new_reply)
    db.session.commit()
    return jsonify({'message': 'Reply added', 'post_id': post_id, 'reply_id': new_reply.id}), 201

@advice_posts_bp.route('/advice', methods=['GET'])
def get_advice_posts():
    posts = AdvicePost.query.all()
    all_posts = []
    for post in posts:
        author = User.query.get(post.user_id)
        if author != None:
            post_data = {'id': post.id, 'question': post.question, 'user_id': post.user_id, 'author':author.username, 'replies': []}
        for reply in post.replies:
            reply_author = User.query.get(reply.user_id)  # Get the username of the reply's author
            if reply_author != None:
                post_data['replies'].append({'id': reply.id, 'text': reply.text, 'user_id': reply.user_id, 'author':reply_author.username})
        all_posts.append(post_data)
    return jsonify(all_posts)

@advice_posts_bp.route('/advice/<int:post_id>/comment', methods=['POST'])
def post_comment(post_id):
    data = request.get_json()
    new_comment = Comment(content=data['content'], user_id=session['user_id'], advice_post_id=post_id)
    db.session.add(new_comment)
    db.session.commit()
    add_tag_to_user(data['content'], session['user_id'])
    return jsonify({'message': 'Comment added', 'post_id': post_id, 'comment_id': new_comment.id}), 201

@advice_posts_bp.route('/advice/<int:post_id>', methods=['DELETE'])
def delete_advice_post(post_id):
    post = AdvicePost.query.get(post_id)
    print(post)
    if not post:
        return jsonify({"message": "Post not found"}), 404

    for reply in post.replies:
        db.session.delete(reply)
        
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200

@advice_posts_bp.route('/advice/<int:post_id>/reply/<int:reply_id>', methods=['DELETE'])
def delete_reply(post_id, reply_id):
    reply = Reply.query.filter_by(id=reply_id, advice_post_id=post_id).first()
    if not reply:
        return jsonify({"message": "Reply not found"}), 404
    
    db.session.delete(reply)
    db.session.commit()
    return jsonify({"message": "Reply deleted"}), 200