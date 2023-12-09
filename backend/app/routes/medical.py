from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User, MedicalProblem, Allergy, Medication, Role, SurgicalHistory, FamilyHistory, db

medical_bp = Blueprint('medical', __name__, url_prefix='/api/medical')


# MEDICAL CONDITIONS

@medical_bp.route('/medical-condition', methods=['POST'])
@jwt_required()
def add_medical_condition():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id

    data = request.json
    print("Data received:", data)

    name = data.get('name')
    additional_notes = data.get('additional_notes')

    try: 
        medical_condition = MedicalProblem (
            patient_id=target_user_id,
            name=name,
            additional_notes=additional_notes
        )
        db.session.add(medical_condition)
        db.session.commit()

        return jsonify({
            'message:': 'Medical condition added',
            'medical_condition': {
                'id': medical_condition.id,
                'name': medical_condition.name,
                'additional_notes': medical_condition.additional_notes
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error:': str(e)}), 400

 
@medical_bp.route('/medical-condition', methods=['GET'])
@jwt_required()
def get_medical_conditions():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id

    try: 
        medical_conditions = MedicalProblem.query.filter_by(patient_id=target_user_id).all()
        conditions_list = [{'id': mc.id, 'name': mc.name, 'additional_notes': mc.additional_notes} for mc in medical_conditions]
        
        return jsonify({'medical-condition': conditions_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@medical_bp.route('/medical-condition/<int:id>', methods=['PATCH'])
@jwt_required()
def update_medical_condition(id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id

    data = request.json

    try:
        medical_condition = MedicalProblem.query.filter_by(id=id, patient_id=target_user_id).first()
        
        if not medical_condition:
            return jsonify({'error': 'Medical condition not found or access denied'}), 404
        
        medical_condition.name = data.get('name', medical_condition.name)
        medical_condition.additional_notes = data.get('additional_notes', medical_condition.additional_notes)
        
        db.session.commit()
        return jsonify({'message': 'Medical condition updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@medical_bp.route('/medical-condition/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_medical_condition(id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id



    medical_condition = MedicalProblem.query.filter_by(
        id=id, patient_id=target_user_id
    ).first()
    if not medical_condition:
        return jsonify({"message": "Medical condition not found or access denied"}), 404
    try:
        db.session.delete(medical_condition)
        db.session.commit()
        return jsonify({"message": "Medical condition deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# ALLERGIES

@medical_bp.route('/allergy', methods = ['POST'])
@jwt_required()
def add_allergy():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id


    data = request.json
    print("Data received:", data)

    allergen = data.get('allergen')
    reaction = data.get('reaction')
    additional_notes = data.get('additional_notes')

    try:
        allergy = Allergy (
            patient_id=target_user_id,
            allergen=allergen,
            reaction=reaction,
            additional_notes=additional_notes
        )
        db.session.add(allergy)
        db.session.commit()

        return jsonify({
            'message': 'Allergy added',
            'allergy': {
                'id': allergy.id,
                'allergen': allergy.allergen,
                'reaction': allergy.reaction,
                'additional_notes': allergy.additional_notes
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
    
@medical_bp.route('/allergy', methods = ['GET'])
@jwt_required()
def get_allergies():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id

    try:
        allergies = Allergy.query.filter_by(patient_id=target_user_id).all()
        allergy_list = [{'id': allergy.id, 'allergen': allergy.allergen, 'reaction': allergy.reaction, 'additional_notes': allergy.additional_notes} for allergy in allergies]
        return jsonify({'allergy': allergy_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@medical_bp.route('/allergy/<int:id>', methods = ['PATCH'])
@jwt_required()
def update_allergy(id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id

    data = request.json

    try:
        allergy = Allergy.query.filter_by(id=id, patient_id=target_user_id).first()

        if not allergy:
            return jsonify({'error': 'Allergy not found or access denied'}), 404
        
        allergy.allergen = data.get('allergen', allergy.allergen)
        allergy.reaction = data.get('reaction', allergy.reaction)
        allergy.additional_notes = data.get('additional_notes', allergy.additional_notes)
    
        db.session.commit()
        return jsonify({'message': 'Allergy updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@medical_bp.route('/allergy/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_allergy(id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id


    allergy = Allergy.query.filter_by(
        id=id, patient_id=target_user_id
    ).first()
    if not allergy:
        return jsonify({"message": "Allergy not found or access denied"}), 404
    try:
        db.session.delete(allergy)
        db.session.commit()
        return jsonify({"message": "Allergy deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500



# MEDICATION ROUTES

@medical_bp.route('/medication', methods=['POST'])
@jwt_required()
def add_medication():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id

    data = request.json

    name = data.get('name')
    dosage = data.get('dosage')
    frequency = data.get('frequency')
    additional_notes = data.get('additional_notes')

    try:
        medication = Medication(
            patient_id=target_user_id,
            name=name,
            dosage=dosage,
            frequency=frequency,
            additional_notes=additional_notes
        )
        db.session.add(medication)
        db.session.commit()
        return jsonify({
            'message': 'Medication added',
            'medication': {
                'id': medication.id,
                'name': medication.name,
                'dosage': medication.dosage,
                'frequency': medication.frequency,
                'additional_notes': medication.additional_notes
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@medical_bp.route('/medication', methods=['GET'])
@jwt_required()
def get_medications():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id

    try:
        medications = Medication.query.filter_by(patient_id=target_user_id).all()
        medication_list = [{'id': med.id, 'name': med.name, 'dosage': med.dosage, 'frequency': med.frequency, 'additional_notes': med.additional_notes} for med in medications]
        return jsonify({'medication': medication_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@medical_bp.route('/medication/<int:id>', methods=['PATCH'])
@jwt_required()
def update_medication(id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id

    data = request.json

    try:
        medication = Medication.query.filter_by(id=id, patient_id=target_user_id).first()

        if not medication:
            return jsonify({'error': 'Medication not found or access denied'}), 404
        
        medication.name = data.get('name', medication.name)
        medication.dosage = data.get('dosage', medication.dosage)
        medication.frequency = data.get('frequency', medication.frequency)
        medication.additional_notes = data.get('additional_notes', medication.additional_notes)

        db.session.commit()
        return jsonify({'message': 'Medication updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

@medical_bp.route('/medication/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_medication(id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id

    medication = Medication.query.filter_by(
        id=id, patient_id=target_user_id
    ).first()
    if not medication:
        return jsonify({"message": "Medication not found or access denied"}), 404
    try:
        db.session.delete(medication)
        db.session.commit()
        return jsonify({"message": "Medication deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# SURGERY ROUTES

@medical_bp.route('/surgery', methods=['POST'], endpoint='add_surgery')
@jwt_required()
def add_surgery():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')

    target_user_id = patient_id if patient_id else current_user_id

    data = request.json

    surgery_type = data.get('surgery_type')
    year = data.get('year')
    additional_notes = data.get('additional_notes')

    try:
        surgery = SurgicalHistory(
            patient_id=target_user_id,
            surgery_type=surgery_type,
            year=year,
            additional_notes=additional_notes
        )
        db.session.add(surgery)
        db.session.commit()

        return jsonify({
            'message': 'Surgery added',
            'surgery': {
                'id': surgery.id,
                'surgery_type': surgery.surgery_type,
                'year': surgery.year,
                'additional_notes': surgery.additional_notes
            }
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@medical_bp.route('/surgery', methods=['GET'], endpoint='surgeries')
@jwt_required()
def get_surgeries():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')

    target_user_id = patient_id if patient_id else current_user_id

    try: 
        surgeries = SurgicalHistory.query.filter_by(patient_id=target_user_id).all()
        surgery_list = [{'id': surgery.id, 'surgery_type': surgery.surgery_type, 'year': surgery.year, 'additional_notes': surgery.additional_notes} for surgery in surgeries]
        return jsonify({'surgery': surgery_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@medical_bp.route('/surgery/<int:id>', methods=['PATCH'], endpoint='update_surgery')
@jwt_required()
def update_surgery(id):
    current_user_id=get_jwt_identity()
    user = User.query.get(current_user_id)

    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')

    target_user_id = patient_id if patient_id else current_user_id

    data = request.json

    try:
        surgery = SurgicalHistory.query.filter_by(id=id, patient_id=target_user_id).first()

        if not surgery:
            return jsonify({'error': 'Surgery not found or access denied'}), 404
        
        surgery.surgery_type = data.get('surgery_type', surgery.surgery_type)
        surgery.year = data.get('year', surgery.year)
        surgery.additional_notes = data.get('additional_notes', surgery.additional_notes)

        db.session.commit()
        return jsonify({'message': 'Surgery updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@medical_bp.route('/surgery/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_surgery(id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')

    target_user_id = patient_id if patient_id else current_user_id

    surgery = SurgicalHistory.query.filter_by(
        id=id, patient_id=target_user_id
    ).first()
    if not surgery:
        return jsonify({"message": "Surgery not found or access denied"}), 404
    try:
        db.session.delete(surgery)
        db.session.commit()
        return jsonify({"message": "Surgery deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# FAMILY HISTORY ROUTES

@medical_bp.route('/family-history', methods=['POST'])
@jwt_required()
def add_family_history():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id
    data = request.json

    relation = data.get('relation')
    medical_condition = data.get('medical_condition')
    additional_notes = data.get('additional_notes')

    try:
        family_history = FamilyHistory(
            patient_id=target_user_id,
            relation=relation,
            medical_condition=medical_condition,
            additional_notes=additional_notes
        )
        db.session.add(family_history)
        db.session.commit()
        return jsonify({
            'message': 'Family history added',
            'family_history': {
                'id': family_history.id,
                'relation': family_history.relation,
                'medical_condition': family_history.medical_condition,
                'additional_notes': family_history.additional_notes
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@medical_bp.route('/family-history', methods=['GET'])
@jwt_required()
def get_family_histories():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id

    try:
        family_histories = FamilyHistory.query.filter_by(patient_id=target_user_id).all()
        history_list = [{'id': history.id, 'relation': history.relation, 'medical_condition': history.medical_condition, 'additional_notes': history.additional_notes} for history in family_histories]
        return jsonify({'family-history': history_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@medical_bp.route('/family-history/<int:id>', methods=['PATCH'])
@jwt_required()
def update_family_history(id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id

    data = request.json

    try:
        family_history = FamilyHistory.query.filter_by(id=id, patient_id=target_user_id).first()

        if not family_history:
            return jsonify({'error': 'Family history not found or access denied'}), 404

        family_history.relation = data.get('relation', family_history.relation)
        family_history.medical_condition = data.get('medical_condition', family_history.medical_condition)
        family_history.additional_notes = data.get('additional_notes', family_history.additional_notes)

        db.session.commit()
        return jsonify({'message': 'Family history updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@medical_bp.route('/family-history/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_family_history(id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    patient_id = None
    if user.role_id in [Role.ADMIN_ID, Role.STAFF_ID]:
        patient_id = request.args.get('patient_id')
    target_user_id = patient_id if patient_id else current_user_id

    family_history = FamilyHistory.query.filter_by(
        id=id, patient_id=target_user_id
    ).first()
    if not family_history:
        return jsonify({"message": "Family history not found or access denied"}), 404
    try:
        db.session.delete(family_history)
        db.session.commit()
        return jsonify({"message": "Family history deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
