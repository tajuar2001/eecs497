from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from gensim.models import Word2Vec, KeyedVectors
import numpy as np
from userAuth.auth import db, User
from adviceBackend.advicePosts import AdvicePost

tag_bp = Blueprint('tags', __name__)

# Assuming other model definitions (User, CommunityPost, Tag, etc.) remain the same
class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
# Load or initialize your Word2Vec model
# For demonstration, we'll pretend to load a pre-trained model
# Replace this with the path to your actual model
word2vec_model_path = 'path/to/your/model'
try:
    model = KeyedVectors.load(word2vec_model_path, mmap='r')
except FileNotFoundError:
    # Placeholder: Initialize a new model if necessary or handle the error
    # This requires actual tag data to train
    model = Word2Vec(sentences=[["python", "flask"], ["machine", "learning"]], vector_size=100, window=5, min_count=1, workers=4)

def get_post_embedding(post):
    """Generate a post's embedding by averaging its tag embeddings."""
    tag_embeddings = [model.wv[tag.name] for tag in post.tags if tag.name in model.wv]
    if tag_embeddings:
        post_embedding = np.mean(tag_embeddings, axis=0)
    else:
        post_embedding = np.zeros(model.vector_size)  # Fallback to zero vector if no tags match
    return post_embedding

def cosine_similarity(vec_a, vec_b):
    """Calculate the cosine similarity between two vectors."""
    dot_product = np.dot(vec_a, vec_b)
    norm_a = np.linalg.norm(vec_a)
    norm_b = np.linalg.norm(vec_b)
    return dot_product / (norm_a * norm_b) if norm_a and norm_b else 0

def find_k_nearest_posts(post_id, k=5):
    target_post = CommunityPost.query.get(post_id)  # Changed to CommunityPost
    if not target_post:
        return []

    all_posts = CommunityPost.query.filter(CommunityPost.id != post_id).all()  # Changed to CommunityPost
    target_embedding = get_post_embedding(target_post)

    similarities = []
    for post in all_posts:
        post_embedding = get_post_embedding(post)
        similarity = cosine_similarity(target_embedding, post_embedding)
        similarities.append((post, similarity))

    similarities.sort(key=lambda x: x[1], reverse=True)
    return [post[0] for post in similarities[:k]]

@tag_bp.route('/recommendations/<int:post_id>', methods=['GET'])
def get_recommendations(post_id):
    k = request.args.get('k', default=5, type=int)
    similar_posts = find_k_nearest_posts(post_id, k)
    results = [{'id': post.id, 'question': post.question, 'tags': [tag.name for tag in post.tags]} for post in similar_posts]
    return jsonify(results)