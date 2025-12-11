from flask import Flask
from flask_cors import CORS
from .database import db
from .config import Config
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)

    # Load config
    app.config.from_object(Config)

    # Init extensions
    CORS(app)
    db.init_app(app)
    JWTManager(app)

    # Register blueprints
    from .routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    return app
