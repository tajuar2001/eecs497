from flask import Blueprint, jsonify, send_from_directory
from flask_cors import CORS

main_routes = Blueprint('main_routes', __name__)
CORS(main_routes)

@main_routes.route('/api/hello')
def hello():
    return jsonify({'message': 'Hello, World!'})

@main_routes.route('/')
def serve():
    return send_from_directory('../frontend/build', 'index.html')  # Adjust path if necessary
