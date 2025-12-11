from flask import Blueprint, request, jsonify
from app.database import db
from app.models import User
from datetime import datetime
from app.utils.hash import hash_password, verify_password
from app.utils.email_service import send_email
from app.models import OTP
from app.utils.otp import generate_otp
from flask_jwt_extended import create_access_token
from sqlalchemy import or_
from app.utils.validators import validate_email, validate_password

auth_bp = Blueprint("auth", __name__)


# ------------------ SIGNUP ------------------
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json

    if not data.get("username"):
        return jsonify({"error": "Username is required"}), 400

    if not validate_email(data.get("email")):
        return jsonify({"error": "Invalid email"}), 400

    if not validate_password(data.get("password")):
        return jsonify({"error": "Weak password"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already exists"}), 400

    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"error": "Username already exists"}), 400

    new_user = User(
        username=data["username"],
        email=data["email"],
        password=hash_password(data["password"])
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


# ------------------ LOGIN ------------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    email_or_username = data.get("email")
    if not email_or_username:
        return jsonify({"error": "Email or username is required"}), 400

    user = User.query.filter(
        or_((User.email == email_or_username), (User.username == email_or_username))
    ).first()

    if not user or not verify_password(data.get("password"), user.password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 200


# ------------------ FORGOT PASSWORD (Send OTP) ------------------
@auth_bp.route("/forgot", methods=["POST"])
def forgot_password():
    email = request.json.get("email")
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    otp_code = generate_otp()

    otp_entry = OTP(
        user_id=user.id,
        otp=otp_code
    )

    db.session.add(otp_entry)
    db.session.commit()

    send_email(user.email, "Your Password Reset OTP", otp_code)

    return jsonify({"message": "OTP sent to email"}), 200


# ------------------ RESET PASSWORD USING OTP ------------------
@auth_bp.route("/reset", methods=["POST"])
def reset_password():
    email = request.json.get("email")
    otp_code = request.json.get("otp")
    new_pass = request.json.get("password")

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    otp_entry = OTP.query.filter_by(
        user_id=user.id,
        otp=otp_code,
        is_used=False
    ).first()

    if not otp_entry:
        return jsonify({"error": "Invalid OTP"}), 400

    if datetime.utcnow() > otp_entry.expires_at:
        return jsonify({"error": "OTP expired"}), 400

    # Mark OTP as used
    otp_entry.is_used = True
    db.session.commit()

    # Update password
    user.password = hash_password(new_pass)
    db.session.commit()

    return jsonify({"message": "Password reset successful"}), 200