from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable = False)
    email = db.Column(db.String(100), nullable = False)
    profile_image_url = db.Column(db.String, )
    password = db.Column(db.String(450), unique=False, )
    phone = db.Column(db.Integer, nullable=False, unique=True)
    role = db.Column(db.String(50), nullable=False)
    created_at  = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    #validate the users email to have an @
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Invalid email address. Must contain '@'.")
        return email
    
    #relationships
    jobs = db.relationship('Job', back_populates='user', lazy=True, cascade='all, delete-orphan')
    job_applications = db.relationship('JobApplication', back_populates = 'users', lazy=True, cascade='all, delete-orphan')
    
    
    
    #   For Logout JWT Block List
class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti =  db.Column(db.String(100),nullable=True)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    

class Job(db.Model):
    
    __tablename__ = 'jobs'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), )
    title = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    company = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    requirements = db.Column(db.String, nullable=False)
    salary = db.Column(db.Integer,  nullable=False)
    deadline = db.Column(db.Date)
    created_at  = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    
    #relationships
    user = db.relationship('User', back_populates = 'jobs', lazy = True)
    job_applications = db.relationship('JobApplication', back_populates = 'job', lazy = True, cascade='all, delete-orphan')
    
    
class JobApplication(db.Model):
    
    __tablename__ = 'job_applications'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), )
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), )
    resume = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)
    created_at  = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    #relationships
    
    users = db.relationship('User', back_populates = 'job_applications', lazy = True)
    job = db.relationship('Job', back_populates = 'job_applications', lazy = True)
    