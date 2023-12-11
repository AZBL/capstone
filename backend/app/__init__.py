import os
from flask import Flask, jsonify 
from config import config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .models import db, RevokedTokenModel
from .routes.auth import auth_bp
from .routes.messages import messages_bp
from .routes.users import users_bp
from .routes.medical import medical_bp
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import uuid

jwt = JWTManager()

def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get('FLASK_CONFIG', 'default')

    if config_name not in config:
        raise ValueError(f'Invalid configuration name: {config_name}')

    app = Flask(__name__)
    app.config.from_object(config[config_name])

    jwt.init_app(app)

    @jwt.token_in_blocklist_loader
    def check_if_token_in_blacklist(jwt_header, jwt_payload):
        jti = jwt_payload["jti"]
        return RevokedTokenModel.is_jti_blacklisted(jti)

    @jwt.additional_claims_loader
    def add_claims_to_jwt(identity):
        return {'jti': str(uuid.uuid4())}


    CORS(app, resources={r"/api/*": {"origins": "https://primecare.vercel.app"}})

    app.register_blueprint(medical_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(messages_bp)
    app.register_blueprint(users_bp)


    db.init_app(app)
    migrate = Migrate(app, db)

    with app.app_context():
        db.create_all()
    
    @app.route('/')
    def index():
        return jsonify(message="Flask API is running!")
        
    return app