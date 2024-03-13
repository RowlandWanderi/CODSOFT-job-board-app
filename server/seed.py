from app import app, db, User, Job, JobApplication
from faker  import Faker
import random

fake = Faker()

#array for job categories
jobCategories = [
  "Software Development",
  "Engineering",
  "Healthcare",
  "Finance",
  "Marketing",
  "Education",
  "Hospitality",
  "Retail",
  "Human Resources",
  "Customer Service"
]

#array for locations in Kenya
kenya_locations = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Eldoret",
    "Nakuru",
    "Meru",
    "Thika",
    "Malindi",
    "Kitale",
    "Nyeri"
]

#Array for user roles

user_roles=[
    "Employer",
    "Candidate"
]

#array for job titles
job_titles = [
    "Software Engineer",
    "Data Scientist",
    "Accountant",
    "Marketing Manager",
    "Human Resources Specialist",
    "Graphic Designer",
    "Sales Representative",
    "Customer Service Representative",
    "Project Manager",
    "Financial Analyst",
    "Web Developer",
    "Civil Engineer",
    "Nurse",
    "Teacher",
    "Administrative Assistant",
    "Operations Manager",
    "Pharmacist",
    "Electrician",
    "Mechanical Engineer",
    "Legal Assistant",
    "Chef",
    "Digital Marketing Specialist",
    "IT Support Specialist",
    "Real Estate Agent",
    "Content Writer",
    "Medical Doctor",
    "Architect",
    "HR Manager",
    "Quality Assurance Analyst",
    "Business Analyst"
]

#array for job descriptions
job_descriptions = [
    "Develop and maintain software applications using modern technologies.",
    "Analyze and interpret data to provide valuable insights for business decision-making.",
    "Manage financial records and transactions to ensure accuracy and compliance.",
    "Plan and execute marketing strategies to promote products or services.",
    "Handle recruitment, employee relations, and other HR functions within the organization.",
    "Create visually appealing designs for various marketing materials and branding.",
    "Identify and acquire new customers while maintaining relationships with existing ones.",
    "Provide assistance and support to customers to address inquiries and resolve issues.",
    "Lead and coordinate project activities to achieve project objectives within scope, budget, and timeline.",
    "Conduct financial analysis and reporting to support strategic planning and decision-making.",
    "Design, develop, and maintain websites and web applications.",
    "Design and oversee the construction of infrastructure projects such as roads and buildings.",
    "Provide patient care, treatment, and support in healthcare settings.",
    "Instruct and educate students in various subjects and academic disciplines.",
    "Assist with administrative tasks and support day-to-day operations.",
    "Oversee and manage operational activities to ensure efficiency and productivity.",
    "Dispense medications and provide pharmaceutical care to patients.",
    "Install, maintain, and repair electrical systems and equipment.",
    "Design, develop, and test mechanical devices and systems.",
    "Assist with legal research, drafting documents, and case management.",
    "Prepare and cook food according to recipes and quality standards.",
    "Develop and implement digital marketing campaigns to drive online engagement and sales.",
    "Provide technical support and troubleshooting for IT systems and software.",
    "Assist clients with buying, selling, and renting real estate properties.",
    "Create engaging and informative content for websites, blogs, and social media.",
    "Diagnose and treat medical conditions and illnesses.",
    "Design and oversee the construction of buildings and structures.",
    "Manage human resources functions and oversee HR policies and procedures.",
    "Ensure the quality and reliability of products and services through testing and analysis.",
    "Analyze business processes and systems to identify opportunities for improvement."
]

#array of job requirements
job_requirements = [
    "Bachelor's degree in Computer Science or related field.",
    "Proficiency in Python, Java, or other programming languages.",
    "Experience with machine learning algorithms and data analysis tools.",
    "CPA certification or equivalent qualification.",
    "Strong analytical and problem-solving skills.",
    "Excellent communication and interpersonal skills.",
    "Proficiency in Adobe Creative Suite or similar design software.",
    "Proven track record of achieving sales targets.",
    "Ability to work independently and manage multiple projects.",
    "Knowledge of financial modeling and forecasting techniques.",
    "Proficiency in HTML, CSS, JavaScript, and other web technologies.",
    "Bachelor's degree in Civil Engineering or related field.",
    "Valid nursing license and CPR certification.",
    "Teaching certification or relevant teaching experience.",
    "Attention to detail and organizational skills.",
    "Project management certification (PMP) is a plus.",
    "PharmD degree and state pharmacy license.",
    "Electrical license or certification.",
    "Experience with CAD software and mechanical design tools.",
    "Paralegal certification or relevant legal experience.",
    "Culinary degree or equivalent experience.",
    "Certification in digital marketing or related field.",
    "ITIL certification or equivalent IT service management experience.",
    "Real estate license and knowledge of local market trends.",
    "Proven writing and editing skills.",
    "MD degree and completion of residency program.",
    "Architectural license and experience with building codes.",
    "HR certification (e.g., SHRM-CP) is a plus.",
    "Experience with quality management systems and methodologies.",
    "Experience with business process modeling and analysis."
]

#array for job application status 
application_status = ["Applied", "Interviewed" , "Successful", "Unsuccessful"]


def seed_data():
    with app.app_context():
        
        print('<<<<<<=Deleting existing seed data=>>>>>>')
        User.query.delete()
        Job.query.delete()
        JobApplication.query.delete()
        
        db.create_all()
        
        print('<<<<<<=Seeding new data to the tables=>>>>>>')
        
        #users data
        
        usersArray = []
        print('<<<<<<=Seeding users data to the tables=>>>>>>')
        for _ in range(25):
            user = User(first_name=fake.first_name(),
                        last_name=fake.last_name(),
                        email=fake.email(),
                        profile_image_url=fake.image_url(),
                        password=fake.password(),
                        phone = fake.random_int(min=10000, max=99999),
                        role =  random.choice(user_roles),
                    )
            usersArray.append(user)
            db.session.add(user)
        db.session.commit()
        
        
        #jobs data
        jobsArray = []
        print('<<<<<<=Seeding jobs data to the tables=>>>>>>')
        for _ in range(150):
            user = random.choice(usersArray)
            job = Job(user=user,
                      title=random.choice(job_titles),
                      category=random.choice(jobCategories),
                      description = random.choice(job_descriptions),
                      company = fake.company(),
                      location = random.choice(kenya_locations),
                      requirements = random.choice(job_requirements),
                      salary = fake.random_int(min=10000, max=99999),
                    )
            jobsArray.append(job)
            db.session.add(job)
        db.session.commit()
        
        #job applications data
        jobapplications = []
        print('<<<<<<=Seeding job applications data to the tables=>>>>>>')
        for _ in range(15):
            users = random.choice(usersArray)
            job = random.choice(jobsArray)
            application = JobApplication(users = users,
                                         job = job,
                                         resume = fake.url(),
                                         status = random.choice(application_status),
                                        )
            jobapplications.append(application)
            db.session.add(application)
        db.session.commit()
        
        print('<<<<<<= Completed seeding! =>>>>>>')
        
if __name__ == '__main__':
    seed_data()
        