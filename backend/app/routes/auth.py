from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from app.models import User, RevokedTokenModel, db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    print("Register endpoint hit")
    data = request.json 
    print("Data received:", data)

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    dob = data.get('dob')

    # perform form validation
    try:
        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            dob=dob,
            role_id=1
        )
        
        new_user.save()

        access_token = create_access_token(identity=new_user.id)
        user_data = {
            "id": new_user.user_id,
            "email": new_user.email,
            "first_name": new_user.first_name,
            "last_name": new_user.last_name,
            "dob": new_user.dob.strftime('%Y-%m-%d') 
        }

        return jsonify({'access_token': access_token, 'user': user_data}), 201


    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    

@auth_bp.route('/login', methods=['POST'])
def login():

    data = request.json
    
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not user.verify_password(password):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    access_token = create_access_token(identity=user.id)
    user_data= {
        "id": user.user_id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "dob": user.dob.strftime('%Y-%m-%d') 
    }

    return jsonify({'access_token': access_token, 'user': user_data}), 200


@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()['jti']
    revoked_token = RevokedTokenModel(jti=jti)
    revoked_token.add()
    return jsonify({'message': 'Access token has been revoked'}), 200