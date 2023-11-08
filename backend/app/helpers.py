from flask_jwt_extended import get_jwt_identity
from app.models import User

def get_current_user():
    user_identity = get_jwt_identity()
    user = User.query.get(user_identity)
    return user