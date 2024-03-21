from flask import Blueprint, request, jsonify, session
from userAuth.auth import db
from userAuth.auth import User

# Models
class Community(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    members = db.relationship('User', secondary='community_membership', back_populates='communities')
    posts = db.relationship('CommunityPost', backref='community', lazy=True)

class CommunityMembership(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    community_id = db.Column(db.Integer, db.ForeignKey('community.id'), primary_key=True)

class CommunityPost(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(1024), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey('community.id'), nullable=False)
    replies = db.relationship('CommunityPostReply', backref='post', lazy=True)

class CommunityPostReply(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.String(1024), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('community_post.id'), nullable=False)

User.communities = db.relationship('Community', secondary='community_membership', back_populates='members')

community_bp = Blueprint('community', __name__)

@community_bp.route('/communities', methods=['GET'])
def get_communities():
    communities = Community.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'description': c.description, 'creator_id':c.creator_id} for c in communities]), 200

@community_bp.route('/communities/<int:community_id>/join', methods=['POST'])
def join_community(community_id):
    user_id = session['user_id']
    community = Community.query.get(community_id)
    if not community:
        return jsonify({'message': 'Community not found'}), 404
    
    user = User.query.get(user_id)
    if user in community.members:
        return jsonify({'message': 'User is already a member of the community'}), 400

    community.members.append(user)
    db.session.commit()
    return jsonify({'message': 'Joined community successfully'}), 200

@community_bp.route('/communities/<int:community_id>/leave', methods=['POST'])
def leave_community(community_id):
    user_id = session.get('user_id')  # Use session.get() to avoid KeyError if 'user_id' is not in the session
    if user_id is None:
        return jsonify({'message': 'User not authenticated'}), 401

    community = Community.query.get(community_id)
    if not community:
        return jsonify({'message': 'Community not found'}), 404
    
    user = User.query.get(user_id)
    if user not in community.members:
        return jsonify({'message': 'User is not a member of this community'}), 400
    
    community.members.remove(user)
    db.session.commit()
    return jsonify({'message': 'Left community successfully'}), 200

@community_bp.route('/communities/<int:community_id>/posts', methods=['POST'])
def create_community_post(community_id):
    user_id = session['user_id']
    data = request.json
    title = data.get('title')
    content = data.get('content')
    
    post = CommunityPost(title=title, content=content, user_id=user_id, community_id=community_id)
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'Post created successfully', 'post_id': post.id}), 201

@community_bp.route('/communities/<int:community_id>/posts/<int:post_id>/replies', methods=['POST'])
def create_community_post_reply(community_id, post_id):
    user_id = session['user_id']
    data = request.json
    content = data.get('content')
    
    reply = CommunityPostReply(content=content, user_id=user_id, post_id=post_id)
    db.session.add(reply)
    db.session.commit()
    return jsonify({'message': 'Reply created successfully', 'reply_id': reply.id}), 201


@community_bp.route('/communities', methods=['POST'])
def create_community():
    data = request.json
    name = data.get('name')
    description = data.get('description')

    existing_community = Community.query.filter_by(name=name).first()
    if existing_community:
        return jsonify({'message': 'A community with this name already exists'}), 400

    community = Community(name=name, description=description, creator_id = session["user_id"])
    db.session.add(community)
    db.session.commit()
    return jsonify({'message': 'Community created successfully', 'community_id': community.id}), 201

@community_bp.route('/communities/<int:community_id>/posts', methods=['GET'])
def get_community_posts(community_id):
    posts = CommunityPost.query.filter_by(community_id=community_id).all()
    post_data = []
    for post in posts:
        author = User.query.get(post.user_id)
        if author != None:
            replies = [{'id': reply.id, 'content': reply.content, 'user_id': reply.user_id, 'author': User.query.get(reply.user_id).username} for reply in post.replies]
            post_data.append({'id': post.id, 'title': post.title, 'content': post.content, 'user_id': post.user_id, 'author': author.username, 'replies': replies})
    return jsonify(post_data), 200

@community_bp.route('/user/communities', methods=['GET'])
def get_user_communities():
    user_id = session['user_id']
    user = User.query.get(user_id)
    user_communities = user.communities
    return jsonify([{'id': c.id, 'name': c.name, 'description': c.description} for c in user_communities]), 200

@community_bp.route('/communities/<int:community_id>', methods=['DELETE'])
def delete_community(community_id):
    user_id = session['user_id']
    community = Community.query.get(community_id)
    if not community:
        return jsonify({'message': 'Community not found'}), 404

    if community.creator_id != user_id:
        return jsonify({'message': 'You are not authorized to delete this community'}), 403

    # Delete associated posts and replies
    posts = CommunityPost.query.filter_by(community_id=community_id).all()
    for post in posts:
        replies = CommunityPostReply.query.filter_by(post_id=post.id).all()
        for reply in replies:
            db.session.delete(reply)
        db.session.delete(post)

    # Delete community memberships
    memberships = CommunityMembership.query.filter_by(community_id=community_id).all()
    for membership in memberships:
        db.session.delete(membership)

    db.session.delete(community)
    db.session.commit()

    return jsonify({'message': 'Community deleted successfully'}), 200

@community_bp.route('/communities/<int:community_id>/posts/<int:post_id>', methods=['DELETE'])
def delete_post(community_id, post_id):
    user_id = session['user_id']
    post = CommunityPost.query.get(post_id)
    if not post:
        return jsonify({'message': 'Post not found'}), 404
    if post.user_id != user_id:
        return jsonify({'message': 'You are not authorized to delete this post'}), 403

    # Delete associated replies
    replies = CommunityPostReply.query.filter_by(post_id=post_id).all()
    for reply in replies:
        db.session.delete(reply)

    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully'}), 200

@community_bp.route('/communities/<int:community_id>/posts/<int:post_id>/replies/<int:reply_id>', methods=['DELETE'])
def delete_reply(community_id, post_id, reply_id):
    user_id = session['user_id']
    reply = CommunityPostReply.query.get(reply_id)
    if not reply:
        return jsonify({'message': 'Reply not found'}), 404
    if reply.user_id != user_id:
        return jsonify({'message': 'You are not authorized to delete this reply'}), 403
    db.session.delete(reply)
    db.session.commit()
    return jsonify({'message': 'Reply deleted successfully'}), 200
