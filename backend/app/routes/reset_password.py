from flask import Blueprint, jsonify, request
from flask_mail import Mail, Message
import random
import string
import datetime
from .. import mongo

reset_password_bp = Blueprint('reset_password', __name__)

# Configure Flask-Mail
mail = Mail()

# Function to generate a random code
def generate_code(length=25):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(length))

# Route to send a reset password email
@reset_password_bp.route('/send-reset-email', methods=['POST'])
def send_reset_email():
    data = request.get_json()
    email = data.get('email')

    user = mongo.db.users.find_one({'email': email})

    if not user:
        return jsonify({'error': 'Email not found'}), 404

    code = generate_code()
    expiration_time = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    save_reset_password_code(user['_id'], code, expiration_time)
       
    msg = Message('Reset Your Password', sender='hosniichernii278@gmail.com', recipients=[email])
    msg.html = f"<h1>Reset Your Password</h1><p>Click <a href='http://localhost:4200/updatePassword/{code}'>here</a> to reset your password.</p>"
    mail.send(msg)
    return jsonify({'message': 'Email sent successfully'}), 200

# Route to reset the password
@reset_password_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    code = data.get('code')
    new_password = data.get('new_password')

    reset_info = mongo.db.reset_password_code.find_one({'code': code})

    if not reset_info:
        return jsonify({'error': 'Invalid token'}), 400

    if datetime.datetime.utcnow() > reset_info['expiration_time']:
        return jsonify({'error': 'Token expired'}), 400

    user_id = reset_info['user_id']
    mongo.db.reset_password_code.delete_one({'code': code})

    # Update user's password
    mongo.db.users.update_one({'_id': user_id}, {'$set': {'password': new_password}})

    return jsonify({'message': 'Password reset successfully'}), 200

# Function to save reset password code to database
def save_reset_password_code(user_id, code, expiration_time):
    mongo.db.reset_password_code.insert_one({'user_id': user_id, 'code': code, 'expiration_time': expiration_time})