import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
class DevelopmentConfig(Config):
    DEBUG = True
    SECRET_KEY = os.environ.get('DEV_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL')
    
class ProductionConfig(Config):
    SECRET_KEY = os.environ.get('PROD_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DATABASE_URL')

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}