from models import db,Job,JobApplication
from flask import request,jsonify ,Blueprint,make_response
from flask_jwt_extended import jwt_required, get_jwt_identity


application_bp = Blueprint('application_bp',__name__)

#view job applications
@application_bp.route('/my_applications', methods=['GET'])
@jwt_required()
def get_job_application():
    current_user_id = get_jwt_identity()
    user_applications = JobApplication.query.filter_by(user_id=current_user_id).all()
    
    user_application_list = []
    for applications in user_applications:
        user_data = {
            'id': applications.id,
            'status': applications.status,
            'resume': applications.resume,
            'created_at': applications.created_at.strftime("%B %d,% Y"),  #formatting
            'job': {
                'id': applications.job.id,
                'title': applications.job.title,
                'category': applications.job.category,
                'company': applications.job.company,
                'location': applications.job.location,
                
            }
        }
        user_application_list.append(user_data)
    return jsonify(user_application_list), 200



#apply for a job
@application_bp.route('/my_applications', methods=['POST'])
@jwt_required()
def apply_for_a_job():
    data = request.get_json()
    #data=request.form
    
    current_user_id = get_jwt_identity()
    
    new_application = JobApplication(
        user_id = current_user_id,
        resume = data['resume'],
        status = 'Applied',
        job_id = data['job_id']
        
    )
    
    
    db.session.add(new_application)
    db.session.commit()
    
    #fetch the created application
    created_application = JobApplication.query.filter_by(id=new_application.id).first()
    
    if created_application:
        response_data = {
            'id': created_application.id,
            'status': created_application.status,
            'resume': created_application.resume,
            'created_at': created_application.created_at.strftime('%Y-%m-%d %H:%M'),
            'users':{
                'id': created_application.users.id,
                'first_name':created_application.users.first_name,
                'last_name':created_application.users.last_name,
            }
        }
        return jsonify({'success': 'Application created successfully', 'application': response_data}), 201
    else:
        return jsonify({'error':'Error creating application'}), 500
    
    
# Delete a job application
@application_bp.route('/my_applications/<int:job_id>', methods=['DELETE'])
@jwt_required()
def delete_job_application(job_id):
    current_user_id = get_jwt_identity()
    job_application= JobApplication.query.get(job_id)
    
    if not job_application:
        return jsonify({"error": "Application not found"}), 404
    
    # Check if the current user is the owner of the job
    if job_application.user_id != current_user_id:
        return jsonify({"error": "You are not authorized to delete this job application"}), 403
    
    db.session.delete(job_application)
    db.session.commit()
    
    return jsonify({"success": "Application deleted successfully"}), 200