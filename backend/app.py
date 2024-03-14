from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from routes import main_routes
from userAuth.auth import auth_routes, db
from flask import request, render_template, jsonify, url_for, redirect, session
from datetime import timedelta
from adviceBackend.advicePosts import advice_posts_bp

migrate = Migrate()

# Initialize Flask app
app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///User.db'  # Adjust as needed
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "secretkey_set_later"
#app.permanent_session_lifetime = timedelta(minutes=5)

# Initialize extensions
CORS(app, supports_credentials=True)
db.init_app(app)
migrate = Migrate(app, db)

# Import and register blueprints after initializing db to avoid circular imports
from routes import main_routes
from userAuth.auth import auth_routes
from kidsBackend.kids import kid_routes
from tagIdentifier.tag import tag_bp

app.register_blueprint(main_routes)
app.register_blueprint(auth_routes)
app.register_blueprint(advice_posts_bp, url_prefix='/api')
app.register_blueprint(kid_routes, url_prefix='/api')
app.register_blueprint(tag_bp, url_prefix='/api')


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)