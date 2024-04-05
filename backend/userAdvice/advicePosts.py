from flask import Blueprint, request, jsonify, session
from userAuth.auth import db
from userAuth.auth import User
from userTag.tag import add_tag_to_user

# Models
class AdvicePost(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(1024), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    comments = db.relationship('Comment', backref='advice_post', lazy=True)
    upvotes = db.Column(db.Integer, default=0)
    downvotes = db.Column(db.Integer, default=0)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.String(1024), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    advice_post_id = db.Column(db.Integer, db.ForeignKey('advice_post.id'), nullable=False)
    parent_comment_id = db.Column(db.Integer, db.ForeignKey('comment.id'), nullable=True)
    upvotes = db.Column(db.Integer, default=0)
    downvotes = db.Column(db.Integer, default=0)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)

    @classmethod
    def insert_initial_categories(cls):
        categories = ['General', 'Relationships', 'Career', 'Education', 'Health', 'Finance']
        for category_name in categories:
            category = cls.query.filter_by(name=category_name).first()
            if not category:
                category = cls(name=category_name)
                db.session.add(category)
        db.session.commit()

advice_posts_bp = Blueprint('advice_posts', __name__)

@advice_posts_bp.route('/advice', methods=['POST'])
def create_advice_post():
    data = request.get_json()
    new_post = AdvicePost(question=data['question'], user_id=session['user_id'], category_id=data['category_id'])
    db.session.add(new_post)
    db.session.commit()
    add_tag_to_user(data['question'], session['user_id'])
    return jsonify({'message': 'Advice post created', 'id': new_post.id}), 201

@advice_posts_bp.route('/advice/<int:post_id>/comment', methods=['POST'])
def create_comment(post_id):
    data = request.get_json()
    new_comment = Comment(content=data['text'], user_id=session['user_id'], advice_post_id=post_id, parent_comment_id=data.get('parent_comment_id'))
    db.session.add(new_comment)
    db.session.commit()
    add_tag_to_user(data['text'], session['user_id'])
    return jsonify({'message': 'Comment added', 'post_id': post_id, 'comment_id': new_comment.id}), 201

@advice_posts_bp.route('/advice', methods=['GET'])
def get_advice_posts():
    posts = AdvicePost.query.all()
    all_posts = []
    for post in posts:
        author = User.query.get(post.user_id)
        if author is not None:
            author_image_url = f"/profile_picture/{author.id}"
            post_data = {
                'id': post.id,
                'question': post.question,
                'author_image_url': author_image_url,
                'user_id': post.user_id,
                'author': author.username,
                'category_id': post.category_id,
                'comments': [],
                'upvotes': post.upvotes,
                'downvotes': post.downvotes
            }
            for comment in post.comments:
                comment_author = User.query.get(comment.user_id)
                if comment_author is not None:
                    author_image_url = f"/profile_picture/{comment_author.id}"
                    post_data['comments'].append({
                        'id': comment.id,
                        'content': comment.content,
                        'author_image_url': author_image_url,
                        'user_id': comment.user_id,
                        'author': comment_author.username,
                        'parent_comment_id': comment.parent_comment_id,
                        'upvotes': comment.upvotes,
                        'downvotes': comment.downvotes
                    })
            all_posts.append(post_data)
    return jsonify(all_posts)

@advice_posts_bp.route('/advice/<int:post_id>', methods=['DELETE'])
def delete_advice_post(post_id):
    post = AdvicePost.query.get(post_id)
    if not post:
        return jsonify({"message": "Post not found"}), 404
    for comment in post.comments:
        db.session.delete(comment)
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200

@advice_posts_bp.route('/advice/<int:post_id>/comment/<int:comment_id>', methods=['DELETE'])
def delete_comment(post_id, comment_id):
    comment = Comment.query.filter_by(id=comment_id, advice_post_id=post_id).first()
    if not comment:
        return jsonify({"message": "Comment not found"}), 404
    db.session.delete(comment)
    db.session.commit()
    return jsonify({"message": "Comment deleted"}), 200

@advice_posts_bp.route('/advice/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{'id': category.id, 'name': category.name} for category in categories])

@advice_posts_bp.route('/advice/<int:post_id>/upvote', methods=['POST'])
def upvote_post(post_id):
    post = AdvicePost.query.get(post_id)
    if not post:
        return jsonify({"message": "Post not found"}), 404
    post.upvotes += 1
    db.session.commit()
    return jsonify({"message": "Post upvoted"}), 200

@advice_posts_bp.route('/advice/<int:post_id>/downvote', methods=['POST'])
def downvote_post(post_id):
    post = AdvicePost.query.get(post_id)
    if not post:
        return jsonify({"message": "Post not found"}), 404
    post.downvotes += 1
    db.session.commit()
    return jsonify({"message": "Post downvoted"}), 200

@advice_posts_bp.route('/advice/<int:post_id>/comment/<int:comment_id>/upvote', methods=['POST'])
def upvote_comment(post_id, comment_id):
    comment = Comment.query.filter_by(id=comment_id, advice_post_id=post_id).first()
    if not comment:
        return jsonify({"message": "Comment not found"}), 404
    comment.upvotes += 1
    db.session.commit()
    return jsonify({"message": "Comment upvoted"}), 200

@advice_posts_bp.route('/advice/<int:post_id>/comment/<int:comment_id>/downvote', methods=['POST'])
def downvote_comment(post_id, comment_id):
    comment = Comment.query.filter_by(id=comment_id, advice_post_id=post_id).first()
    if not comment:
        return jsonify({"message": "Comment not found"}), 404
    comment.downvotes += 1
    db.session.commit()
    return jsonify({"message": "Comment downvoted"}), 200