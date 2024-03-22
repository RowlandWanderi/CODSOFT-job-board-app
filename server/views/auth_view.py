from models import db,User,TokenBlocklist
from flask import request,jsonify ,Blueprint
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity,jwt_required,get_jwt

auth_bp = Blueprint('auth_bp',__name__)

#login
@auth_bp.route('/login', methods=['POST'])
def login():
   data = request.get_json()
   #data=request.form

   email = data['email']
   password = data['password']
   
   user = User.query.filter_by(email=email).first()

   if not user:
      return jsonify({"error":"email does not exist"}),404
   
   if user:
      if check_password_hash(user.password, password):
         access_token = create_access_token(identity = user.id)
         return jsonify(access_token = access_token),201

      return jsonify({"error":"Wrong password!"}),404
   

#get logged user
@auth_bp.route('/authenticated_user')
@jwt_required()
def authenticated_user():
   current_user_id = get_jwt_identity() #current user id

   user = User.query.get(current_user_id)

   if not user:
      return jsonify({"error":"User not found"}),404

   if user:
      return jsonify({
         "id":user.id,
         "first_name":user.first_name,
         "last_name":user.last_name,
         "email":user.email,
         "phone":user.phone,
         "role":user.role
      }),200

# Logout user
@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jwt = get_jwt()

    jti = jwt['jti']

    token_b = TokenBlocklist(jti=jti)
    db.session.add(token_b)
    db.session.commit()

    return jsonify({"success": "Logged out successfully!"}), 201