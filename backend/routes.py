from flask import Blueprint, jsonify, request
import requests
from flask_cors import CORS

main_routes = Blueprint('main_routes', __name__)
CORS(main_routes)