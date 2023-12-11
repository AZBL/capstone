from flask import Blueprint, jsonify

status_bp = Blueprint('status', __name__)

@status_bp.route('/api/wakeup', methods=['GET'])
def wake_up():
    return jsonify({"message": "Server awakened"}), 200        
        
@status_bp.route('/api/status', methods=['GET'])
def server_status():
    return jsonify({"status": "ready"}), 200
