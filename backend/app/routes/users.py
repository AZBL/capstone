from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.models import User, Role
from ..helpers import get_current_user
from sqlalchemy import or_

users_bp = Blueprint('users_bp', __name__, url_prefix='/users')

@users_bp.route('/search', methods=['GET'])
@jwt_required()
def search_users():
    current_user = get_current_user() 
    search_term = request.args.get('q', '') 
    query = User.query

    if current_user.role_id == Role.PATIENT_ID:
        query = query.filter(User.role_id.in_([Role.STAFF_ID, Role.ADMIN_ID]))

    if search_term:
        query = query.filter(
            or_(
                User.first_name.ilike(f'%{search_term}%'),
                User.last_name.ilike(f'%{search_term}%'),
            )
        )

    users = query.all()

    users_data = [{
        'user_id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'dob': user.dob.strftime('%Y-%m-%d') if user.dob else None
    } for user in users]

    return jsonify(users_data), 200
        

