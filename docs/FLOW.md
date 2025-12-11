# App Flow Documentation — Login / Signup / Forgot Password

This file describes the full flow of the authentication system.

---

# 🌱 Signup Flow

1. User enters **Name, Email, Password**.
2. Frontend sends POST `/api/signup`
3. Backend:
   - Validates input
   - Checks if email exists
   - Hashes password
   - Saves user in MySQL
4. Returns success message
5. User redirected to Login page

---

# 🔐 Login Flow

1. User enters **Email + Password**
2. Frontend sends POST `/api/login`
3. Backend:
   - Validates email & password
   - Verifies password hash
   - Generates JWT token
4. Returns token
5. Frontend stores token (localStorage)
6. Redirects user to Dashboard (Protected)

---

# 🔄 Forgot Password Flow

1. User enters email
2. Frontend sends POST `/api/forgot`
3. Backend:
   - Checks if email exists
   - Generates reset token
   - Stores token in DB temporarily
4. Returns reset token
5. Frontend redirects user → `/reset-password/<token>`

---

# 🛠 Reset Password Flow

1. User enters new password
2. Frontend sends POST `/api/reset/<token>`
3. Backend:
   - Validates token
   - Updates password hash
   - Deletes/invalidates token
4. Returns success message
5. Redirect to login

---

# 🧪 Protected Route Flow

1. Frontend sends request with:
2. Backend verifies JWT
3. If valid → returns user profile
4. If invalid → returns 401

---

# 🔁 End-to-End Summary

Signup → Login → Dashboard  
Forgot → Reset → Login Again → Dashboard

Simple. Clean. Real-world structure.
