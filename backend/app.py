from flask import Flask
from flask_cors import CORS
from routes import main_routes
from userTag.tag import tag_bp
from flask_caching import Cache
from flask_migrate import Migrate
from userKids.kids import kid_routes
from userAuth.auth import auth_routes, db
from userAdvice.advicePosts import advice_posts_bp
from userCommunity.community import community_bp
from userAdvice.advicePosts import Category

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///User.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "secretkey_set_later"

# Initialize extensions
CORS(app, supports_credentials=True)
db.init_app(app)
migrate = Migrate(app, db)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

app.register_blueprint(main_routes)
app.register_blueprint(auth_routes)
app.register_blueprint(advice_posts_bp, url_prefix='/api')
app.register_blueprint(kid_routes, url_prefix='/api')
app.register_blueprint(tag_bp, url_prefix='/api')
app.register_blueprint(community_bp, url_prefix='/api')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        Category.insert_initial_categories()
    app.run(debug=True)