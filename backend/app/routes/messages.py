from app.models import Message, User, db
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Blueprint, request, jsonify
from datetime import datetime


messages_bp = Blueprint('messages', __name__, url_prefix='/messages')

@messages_bp.route('/', methods=['GET'])
@jwt_required()
def get_messages():
    current_user_id = get_jwt_identity()
    messages = Message.query.filter_by(recipient_id=current_user_id).all()
    return jsonify([message.to_dict() for message in messages]), 200

@messages_bp.route('/<int:message_id>', methods=['GET'])
@jwt_required()
def get_message(message_id):
    current_user_id = get_jwt_identity()
    message = Message.query.filter_by(id=message_id, recipient_id=current_user_id).first()
    if not message:
        return jsonify({"message": "Message not found or access denied"}), 404
    return jsonify(message.to_dict()), 200

@messages_bp.route('/send_message', methods=['POST'])
@jwt_required()
def send_message():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    recipient_id = data.get('recipient_id')
    subject = data.get('subject')
    content = data.get('content')
    parent_message_id = data.get('parent_message_id', None)

    try: 
        new_message = Message(
            sender_id=current_user_id, 
            recipient_id=recipient_id,
            subject=subject,
            content=content,
            parent_message_id=parent_message_id
            )
        db.session.add(new_message)
        db.session.commit()
        return jsonify({'message': 'Message sent successfully', 'message_id': new_message.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@messages_bp.route('/<int:message_id>', methods=['DELETE'])
@jwt_required()
def delete_message(message_id):
    current_user_id = get_jwt_identity()
    message = Message.query.filter_by(id=message_id, sender_id=current_user_id).first()
    if not message:
        return jsonify({"message": "Message not found or access denied"}), 404
    db.session.delete(message)
    db.session.commit()
    return jsonify({"message": "Message deleted"}), 200