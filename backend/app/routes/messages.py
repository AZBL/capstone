from app.models import Message, User, db
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Blueprint, request, jsonify
from datetime import datetime


messages_bp = Blueprint('messages', __name__, url_prefix='/api/messages')

@messages_bp.route('/display', methods=['GET'])
@jwt_required()
def get_messages():
    current_user_id = get_jwt_identity()
    messages = Message.query.filter_by(recipient_id=current_user_id, is_deleted_by_recipient=False).all()

    messages_data = []

    for message in messages:
        message_data = {
            'id': message.id,
            'subject': message.subject,
            'timestamp': message.timestamp.strftime('%Y-%m-%d'),
            'is_read': message.is_read,
            'sender_id': message.sender.id,
            'sender_first_name': message.sender.first_name,
            'sender_last_name': message.sender.last_name
        }
        messages_data.append(message_data)

    return jsonify(messages_data), 200

@messages_bp.route('/<int:message_id>', methods=['GET'])
@jwt_required()
def get_message(message_id):
    current_user_id = get_jwt_identity()
    message = Message.query.filter_by(id=message_id, recipient_id=current_user_id).first()
    if not message:
        return jsonify({"message": "Message not found or access denied"}), 404
    return jsonify({
            'id': message.id,
            'subject': message.subject,
            'content': message.content,
            'timestamp': message.timestamp.strftime('%Y-%m-%d'),
            'sender_id': message.sender.id,
            'sender_first_name': message.sender.first_name,
            'sender_last_name': message.sender.last_name
        }), 200

@messages_bp.route('/sent', methods=['GET'])
@jwt_required()
def get_sent_messages():
    current_user_id = get_jwt_identity()
    messages = Message.query.filter_by(sender_id=current_user_id, is_deleted_by_sender=False).all()

    messages_data = []

    for message in messages:
        message_data = {
            'id': message.id,
            'subject': message.subject,
            'timestamp': message.timestamp.strftime('%Y-%m-%d'),
            'is_read': message.is_read,
            'recipient_id': message.recipient.id,
            'recipient_first_name': message.recipient.first_name,
            'recipient_last_name': message.recipient.last_name
        }
        messages_data.append(message_data)

    return jsonify(messages_data), 200


@messages_bp.route('/sent/<int:message_id>', methods=['GET'])
@jwt_required()
def get_sent_message(message_id):
    current_user_id = get_jwt_identity()
    message = Message.query.filter_by(id=message_id, sender_id=current_user_id).first()
    if not message:
        return jsonify({"message": "Message not found or access denied"}), 404
    return jsonify({
            'id': message.id,
            'subject': message.subject,
            'content': message.content,
            'timestamp': message.timestamp.strftime('%Y-%m-%d'),
            'recipient_id': message.recipient.id,
            'recipient_first_name': message.recipient.first_name,
            'recipient_last_name': message.recipient.last_name
        }), 200

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
    message = Message.query.filter(
        (Message.id == message_id) & 
        ((Message.recipient_id == current_user_id) | (Message.sender_id == current_user_id))
    ).first()
    if not message:
        return jsonify({"message": "Message not found or access denied"}), 404
    
    if message.sender_id == current_user_id:
        message.is_deleted_by_sender = True
    elif message.recipient_id == current_user_id:
        message.is_deleted_by_recipient = True

    db.session.commit()  
    return jsonify({"message": "Message marked as deleted"}), 200