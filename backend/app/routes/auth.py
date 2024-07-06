from flask import Blueprint, jsonify, request
from ..models import User
from ..utils import generate_token
from .. import mongo
from flask_cors import CORS
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    if mongo.db.users.find_one({'username': username}):
        return jsonify({'message': 'Username already exists'}), 400

    user = User(username, password,email)
    user.save()
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = mongo.db.users.find_one({'email': email})

    if not user or user['password'] != password:
        return jsonify({'message': 'Invalid email or password'}), 401

    token = generate_token(email)
    return jsonify({
        'message': 'User logged in successfully',
        'token': token  # Remove .decode('utf-8')
    }), 200
