from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User, MedicalProblem, Allergy, Medication, SurgicalHistory, FamilyHistory, db

medical_bp = Blueprint('medical', __name__, url_prefix='/api/medical')

@medical_bp.route('/add-medical-problem', methods=['POST'])
@jwt_required()
def add_medical_problem():
    current_user_id = get_jwt_identity()
    data = request.json
    print("Data received:", data)

    name = data.get('name')
    additional_notes = data.get('additional_notes')

    try: 
        medical_problem = MedicalProblem (
            patient_id=current_user_id,
            name=name,
            additional_notes=additional_notes
        )
        db.session.add(medical_problem)
        db.session.commit()
        return jsonify({'message': 'Medical problem added successfully', "medical problem": medical_problem.name}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error:': str(e)}), 400

 
@medical_bp.route('/medical-problems', methods=['GET'])
@jwt_required()
def get_medical_problems():
    current_user_id = get_jwt_identity()

    try: 
        medical_problems = MedicalProblem.query.filter_by(patient_id=current_user_id).all()
        problems_list = [{'id': mp.id, 'name': mp.name, 'additional_notes': mp.additional_notes} for mp in medical_problems]
        
        return jsonify({'medical_problems': problems_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@medical_bp.route('/update-medical-problem/<int:problem_id>', methods=['PATCH'])
@jwt_required()
def update_medical_problem(problem_id):
    current_user_id = get_jwt_identity()
    data = request.json

    try:
        medical_problem = MedicalProblem.query.filter_by(id=problem_id, patient_id=current_user_id).first()
        
        if not medical_problem:
            return jsonify({'error': 'Medical problem not found or access denied'}), 404
        
        medical_problem.name = data.get('name', medical_problem.name)
        medical_problem.additional_notes = data.get('additional_notes', medical_problem.additional_notes)
        
        db.session.commit()
        return jsonify({'message': 'Medical problem updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@medical_bp.route('/add-allergy', methods = ['POST'])
@jwt_required()
def add_allergy():
    current_user_id = get_jwt_identity()
    data = request.json
    print("Data received:", data)

    allergen = data.get('allergen')
    reaction = data.get('reaction')
    additional_notes = data.get('additional_notes')

    try:
        allergy = Allergy (
            patient_id=current_user_id,
            allergen=allergen,
            reaction=reaction,
            additional_notes=additional_notes
        )
        db.session.add(allergy)
        db.session.commit()
        return jsonify({'message': 'Allergy added', 'allergy_id': allergy.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
    
@medical_bp.route('/allergies', methods = ['GET'])
@jwt_required()
def get_allergies():
    current_user_id = get_jwt_identity()

    try:
        allergies = Allergy.query.filter_by(patient_id=current_user_id).all()
        allergy_list = [{'id': allergy.id, 'allergen': allergy.allergen, 'reaction': allergy.reaction, 'additional_notes': allergy.additional_notes} for allergy in allergies]
        return jsonify({'allergies': allergy_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@medical_bp.route('/update-allergy/<int:allergy_id>', methods = ['PATCH'])
@jwt_required()
def update_allergy(allergy_id):
    current_user_id = get_jwt_identity()
    data = request.json

    try:
        allergy = Allergy.query.filter_by(id=allergy_id, patient_id=current_user_id).first()

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
                  
@medical_bp.route('/add-medication', methods=['POST'])
@jwt_required()
def add_medication():
    current_user_id = get_jwt_identity()
    data = request.json

    name = data.get('name')
    dosage = data.get('dosage')
    frequency = data.get('frequency')
    additional_notes = data.get('additional_notes')

    try:
        medication = Medication(
            patient_id=current_user_id,
            name=name,
            dosage=dosage,
            frequency=frequency,
            additional_notes=additional_notes
        )
        db.session.add(medication)
        db.session.commit()
        return jsonify({'message': 'Medication added', 'medication_id': medication.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@medical_bp.route('/medications', methods=['GET'])
@jwt_required()
def get_medications():
    current_user_id = get_jwt_identity()

    try:
        medications = Medication.query.filter_by(patient_id=current_user_id).all()
        medication_list = [{'id': med.id, 'name': med.name, 'dosage': med.dosage, 'frequency': med.frequency, 'additional_notes': med.additional_notes} for med in medications]
        return jsonify({'medications': medication_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@medical_bp.route('/update-medication/<int:medication_id>', methods=['PATCH'])
@jwt_required()
def update_medication(medication_id):
    current_user_id = get_jwt_identity()
    data = request.json

    try:
        medication = Medication.query.filter_by(id=medication_id, patient_id=current_user_id).first()

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

@medical_bp.route('/add-surgery', methods=['POST'], endpoint='add_surgery')
@jwt_required
def add_surgery():
    current_user_id = get_jwt_identity()
    data = request.json

    surgery_type = data.get('surgery_type')
    year = data.get('year')
    additional_notes = data.get('additional_notes')

    try:
        surgery = SurgicalHistory(
            patient_id=current_user_id,
            surgery_type=surgery_type,
            year=year,
            additional_notes=additional_notes
        )
        db.session.add(surgery)
        db.session.commit()
        return jsonify({'message': 'Surgery added successfully', 'surgery_id': surgery.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@medical_bp.route('/surgeries', methods=['GET'], endpoint='surgeries')
@jwt_required
def get_surgeries():
    current_user_id = get_jwt_identity()
    try: 
        surgeries = SurgicalHistory.query.filter_by(patient_id=current_user_id).all()
        surgery_list = [{'id': surgery.id, 'surgery_type': surgery.surgery_type, 'year': surgery.year, 'additional_notes': surgery.additional_notes} for surgery in surgeries]
        return jsonify({'surgeries': surgery_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@medical_bp.route('/update-surgery/<int:surgery_id>', methods=['PATCH'], endpoint='update_surgery')
@jwt_required
def update_surgery(surgery_id):
    current_user_id=get_jwt_identity()
    data = request.json

    try:
        surgery = SurgicalHistory.query.filter_by(id=surgery_id, patient_id=current_user_id).first()

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
    
@medical_bp.route('/add-family-history', methods=['POST'])
@jwt_required()
def add_family_history():
    current_user_id = get_jwt_identity()
    data = request.json

    relation = data.get('relation')
    medical_condition = data.get('medical_condition')
    additional_notes = data.get('additional_notes')

    try:
        family_history = FamilyHistory(
            patient_id=current_user_id,
            relation=relation,
            medical_condition=medical_condition,
            additional_notes=additional_notes
        )
        db.session.add(family_history)
        db.session.commit()
        return jsonify({'message': 'Family history added successfully', 'family_history_id': family_history.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@medical_bp.route('/family-histories', methods=['GET'])
@jwt_required()
def get_family_histories():
    current_user_id = get_jwt_identity()

    try:
        family_histories = FamilyHistory.query.filter_by(patient_id=current_user_id).all()
        history_list = [{'id': history.id, 'relation': history.relation, 'medical_condition': history.medical_condition, 'additional_notes': history.additional_notes} for history in family_histories]
        return jsonify({'family_histories': history_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@medical_bp.route('/update-family-history/<int:family_history_id>', methods=['PATCH'])
@jwt_required()
def update_family_history(family_history_id):
    current_user_id = get_jwt_identity()
    data = request.json

    try:
        family_history = FamilyHistory.query.filter_by(id=family_history_id, patient_id=current_user_id).first()

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
