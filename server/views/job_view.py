from models import db,Job,JobApplication
from flask import request,jsonify ,Blueprint,make_response
from flask_jwt_extended import jwt_required, get_jwt_identity

job_bp = Blueprint('job_bp',__name__)

#view jobs
@job_bp.route('/jobs' , methods=['GET'])
def get_all_jobs():
    jobs = Job.query.all()
    jobs_list = []
    
    for job in jobs:
        jobs_data ={
            'id': job.id,
            'title':job.title,
            'category':job.category,
            'description':job.description,
            'company':job.company,
            'location':job.location,
            'requirements':job.requirements,
            'salary':job.salary,
            'created_at':job.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        jobs_list.append(jobs_data)
    response = make_response(jsonify(jobs_list),200)
    return response

# View jobs posted by user
@job_bp.route('/my_jobs', methods=['GET'])
@jwt_required()  # Requires authentication
def get_user_jobs():
    current_user_id = get_jwt_identity()  # Get current user's ID from JWT token
    user_jobs = Job.query.filter_by(user_id=current_user_id).all()
    
    user_jobs_list = []
    for job in user_jobs:
        user_job_data = {
            'id': job.id,
            'title': job.title,
            'category': job.category,
            'description': job.description,
            'company': job.company,
            'location': job.location,
            'requirements': job.requirements,
            'salary': job.salary,
            'created_at': job.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        user_jobs_list.append(user_job_data)
    return jsonify(user_jobs_list), 200

#add a new job
@job_bp.route("/my_jobs",methods=['POST'])
@jwt_required()   #Require Authentication to access this route
def add_a_new_job():
    #data = request.get_json()
    data=request.form
    
    current_user_id = get_jwt_identity()
    
    new_job = Job(
        user_id = current_user_id,
        title = data['title'],
        category = data['category'],
        description = data['description'],
        company = data['company'],
        location = data['location'],
        requirements = data['requirements'],
        salary = data['salary'],
    )
    db.session.add(new_job)
    db.session.commit()
    
    #fetch the created job 
    created_job = Job.query.filter_by(id=new_job.id).first()
    if created_job:
        response_data={
            'id': created_job.id,
            'title': created_job.title,
            'category': created_job.category,
            'description': created_job.description,
            'company': created_job.company,
            'location': created_job.location,
            'requirements':created_job.requirements,
            'salary': created_job.salary,
            'created_at': created_job.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        return jsonify({'message': 'Job created successfully','job':response_data}), 201
    else:
        return jsonify({'error': 'Failed to fetch the created review'}), 500
    
    
#update job details
@job_bp.route('/my_jobs/<int:job_id>', methods=['PUT'])
@jwt_required()
def update_job(job_id):
    #data = request.get_json()
    data=request.form
    
    # Ensure required fields are present in the request
    required_fields = ['title', 'category', 'description', 'location', 'company', 'requirements', 'salary']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 404
        
    title = data['title']
    category = data['category']
    description = data['description']
    location = data['location']
    company = data['company']
    salary = data['salary']
    requirements = data['requirements']
    
    #check if the job exists
    existing_job = Job.query.get(job_id)
    
    if not existing_job:
        return make_response(jsonify({'error': 'Job not found'}), 404)   
    else:
        #check if the user is logged in to update the job
        if existing_job.user_id == get_jwt_identity():
            #update the job details
            existing_job.title = title
            existing_job.category = category
            existing_job.description = description
            existing_job.location = location
            existing_job.company = company
            existing_job.salary = salary
            existing_job.requirements = requirements
            db.session.commit()
            
            response_data = {
                'id':existing_job.id,
                'title': existing_job.title,
                "category": existing_job.category,
                'description': existing_job.description,
                'location': existing_job.location,
                'company': existing_job.company,
                'salary':  existing_job.salary,
                'requirements': existing_job.requirements,
                'created_at': existing_job.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
            return make_response(jsonify(response_data),200)
        else:
            return jsonify({"error": "You are not authorized to update this job!"}), 404 
        
        
# View job applications for a job
@job_bp.route('/my_jobs/<int:job_id>', methods=['GET'])
def get_job_applications(job_id):
    job = Job.query.get(job_id)
    
    if not job:
        return jsonify({"error": "Job not found"}), 404
    
    job_applications = JobApplication.query.filter_by(job_id=job_id).all()
    
    if not job_applications:
        return jsonify({"message": "No applications for this job"}), 200
    
    job_applications_list = []
    for application in job_applications:
        application_data = {
            'id': application.id,
            'resume': application.resume,
            'status': application.status,
            'created_at': application.created_at,
            'user':{
                'id':application.users.id,
                'first_name': application.users.first_name,
                'last_name': application.users.last_name,
                'phone': application.users.phone,
                'email': application.users.email,
            }
        }
        job_applications_list.append(application_data)
    
    return jsonify(job_applications_list), 200

# Delete a job
@job_bp.route('/my_jobs/<int:job_id>', methods=['DELETE'])
@jwt_required()
def delete_job(job_id):
    current_user_id = get_jwt_identity()
    job = Job.query.get(job_id)
    
    if not job:
        return jsonify({"error": "Job not found"}), 404
    
    # Check if the current user is the owner of the job
    if job.user_id != current_user_id:
        return jsonify({"error": "You are not authorized to delete this job"}), 403
    
    db.session.delete(job)
    db.session.commit()
    
    return jsonify({"message": "Job deleted successfully"}), 200