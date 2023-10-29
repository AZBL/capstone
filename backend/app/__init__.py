import os
from flask import Flask, jsonify 
from config import config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .models import db
from .routes.auth import auth_bp
from flask_cors import CORS
from flask_jwt_extended import JWTManager

jwt = JWTManager()

def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get('FLASK_CONFIG', 'default')

    if config_name not in config:
        raise ValueError(f'Invalid configuration name: {config_name}')

    app = Flask(__name__)
    app.config.from_object(config[config_name])

    jwt.init_app(app)

    CORS(app)

    app.register_blueprint(auth_bp, url_prefix='/auth')

    db.init_app(app)
    migrate = Migrate(app, db)

    with app.app_context():
        db.create_all()
    
    @app.route('/')
    def index():
        return jsonify(message="Flask API is running!")
        
    return app