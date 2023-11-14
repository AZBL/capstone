from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
import random

db = SQLAlchemy()

class User(db.Model):
    
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.String(8), unique=True, nullable=False)
    date_created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')
    
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    @staticmethod
    def get_by_user_id(user_id):
        if user_id:
            return User.query.filter_by(user_id=user_id).first()
        return None
    
    @staticmethod
    def generate_user_id():
        while True:
            user_id = ''.join(secrets.choice('0123456789') for _ in range(8))
            if not User.get_by_user_id(user_id):
                return user_id
            
    def save(self):
        if not self.user_id:
            self.user_id = self.generate_user_id()
        db.session.add(self)
        db.session.commit()


class Role(db.Model):
    
    __tablename__ = 'roles'

    PATIENT_ID = 1
    ADMIN_ID = 2
    STAFF_ID = 3

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True)
    users = db.relationship('User', backref='role', lazy='dynamic')

class Message(db.Model):
    
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    subject = db.Column(db.String(255), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    parent_message_id = db.Column(db.Integer, db.ForeignKey('messages.id'))
    is_read = db.Column(db.Boolean, default=False)
    sender = db.relationship('User', foreign_keys=[sender_id], backref='sent_messages')
    recipient = db.relationship('User', foreign_keys=[recipient_id], backref='received_messages')
    replies = db.relationship('Message', backref=db.backref('parent_message', remote_side=[id]))
    is_deleted_by_recipient = db.Column(db.Boolean, default=False)
    is_deleted_by_sender = db.Column(db.Boolean, default=False)


    def __repr__(self):
        return f'<Message {self.id} from {self.sender_id}>'
    

class RevokedTokenModel(db.Model):
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120), unique=True)

    def add(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti=jti).first()
        return bool(query)