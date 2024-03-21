from flask import request, jsonify, Blueprint, session
import numpy as np
from userAuth.auth import db
from sklearn.feature_extraction.text import TfidfVectorizer
from sqlalchemy.exc import SQLAlchemyError

tag_bp = Blueprint('tags', __name__)

class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    user = db.relationship('User', backref=db.backref('tags', lazy=True))
    weight = db.Column(db.Float, default=1.0)  # Default weight is 1.0

def generate_tags_from_text(text, top_n=5):
    corpus = [text]
    vectorizer = TfidfVectorizer(stop_words='english', use_idf=True, lowercase=True, norm='l2')
    tfidf_matrix = vectorizer.fit_transform(corpus)
    feature_names = vectorizer.get_feature_names_out()
    tfidf_scores = tfidf_matrix.toarray()[0]  # Convert sparse matrix to dense and get the first document scores

    sorted_indices = np.argsort(tfidf_scores)[::-1]
    top_features = [(feature_names[i], tfidf_scores[i]) for i in sorted_indices[:top_n]]

    return top_features

# Function to add tags to a user
def add_tag_to_user(text):
    user_id = session["user_id"]
    tags_with_weights = generate_tags_from_text(text)
    for tag_name, weight in tags_with_weights:
        tag = Tag.query.filter_by(name=tag_name, user_id=user_id).first()
        if not tag:
            tag = Tag(name=tag_name, user_id=user_id, weight=weight)
        else:
            tag.weight = weight
        db.session.add(tag)
        db.session.commit()

def add_tag_to_user(text, user_id):
    tags_with_weights = generate_tags_from_text(text)
    if tags_with_weights == None:
        return
    for tag_name, weight in tags_with_weights:
        tag = Tag.query.filter_by(name=tag_name, user_id=user_id).first()
        if not tag:
            tag = Tag(name=tag_name, user_id=user_id, weight=weight)
        else:
            tag.weight = weight
        try:
            db.session.add(tag)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()

@tag_bp.route('/recommendations/<int:post_id>', methods=['GET'])
def get_recommendations(post_id):
    k = request.args.get('k', default=5, type=int)
    # Placeholder for actual recommendation logic
    # Use `k` and `post_id` to generate recommendations
    return jsonify({"message": f"Recommendations for post {post_id} with k={k} not implemented."})

@tag_bp.route('/user/tags', methods=['GET'])
def get_user_tags():
    user_id = session.get("user_id")
    if user_id is None:
        return jsonify({"error": "User not found"}), 404
    tags = Tag.query.filter_by(user_id=user_id).all()
    tag_list = [{'id': tag.id, 'name': tag.name, 'weight': tag.weight} for tag in tags]
    return jsonify(tag_list), 200



from communityBackend.community import Community  # Import the Community model

@tag_bp.route('/recommendations/communities/<int:user_id>', methods=['GET'])
def get_community_recommendations(user_id):
    print("requested")
    user_tags = Tag.query.filter_by(user_id=user_id).all()
    if not user_tags:
        communities = Community.query.order_by(db.func.random()).limit(5).all()
        return jsonify([{'id': c.id, 'name': c.name, 'description': c.description} for c in communities])

    community_scores = {}
    for community in Community.query.all():
        community_score = 0
        for tag in user_tags:
            if tag.name in community.name.lower() or tag.name in community.description.lower():
                community_score += tag.weight
        community_scores[community] = community_score

    sorted_communities = sorted(community_scores.items(), key=lambda x: x[1], reverse=True)
    recommended_communities = [{'id': c.id, 'name': c.name, 'description': c.description} for c, _ in sorted_communities[:5]]

    return jsonify(recommended_communities)