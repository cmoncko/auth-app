import re

def validate_email(email):
    return re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", email)

def validate_password(password):
    return len(password) >= 6
