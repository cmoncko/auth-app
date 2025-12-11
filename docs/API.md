# API Documentation — Authentication System (Flask + MySQL)

**Base URL (Local):** `http://localhost:5000/api/auth`

**Base URL (Production):** `https://your-domain.com/api`

---

## 📌 **1. Signup API**

### **POST** `/signup`

Registers a new user with email, username, and password.

### Request Body
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Validation Rules:**
- Username: 3+ characters, unique
- Email: Valid email format, unique
- Password: 6+ chars, 1 number, 1 special character

### Responses

✅ **201 Created** - User registered successfully
```json
{
  "message": "User created successfully"
}
```

❌ **400 Bad Request** - Username is required
```json
{
  "error": "Username is required"
}
```

❌ **400 Bad Request** - Invalid email
```json
{
  "error": "Invalid email"
}
```

❌ **400 Bad Request** - Weak password
```json
{
  "error": "Weak password"
}
```

❌ **400 Bad Request** - Email already exists
```json
{
  "error": "Email already exists"
}
```

❌ **400 Bad Request** - Username already exists
```json
{
  "error": "Username already exists"
}
```

---

## 📌 **2. Login API**

### **POST** `/login`

Authenticates user and returns JWT token. Login works with email OR username.

### Request Body (with email)
```json
{
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

### Request Body (with username)
```json
{
  "username": "johndoe",
  "password": "SecurePass@123"
}
```

### Responses

✅ **200 OK** - Login successful
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyMzAwMDAwfQ...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

❌ **400 Bad Request** - Email or username is required
```json
{
  "error": "Email or username is required"
}
```

❌ **401 Unauthorized** - Invalid credentials
```json
{
  "error": "Invalid credentials"
}
```

---

## 📌 **3. Forgot Password API**

### **POST** `/forgot`

Sends OTP to user's registered email for password reset.

### Request Body
```json
{
  "email": "john@example.com"
}
```

### Responses

✅ **200 OK** - OTP sent successfully
```json
{
  "message": "OTP sent to email"
}
```

❌ **404 Not Found** - User not found
```json
{
  "error": "User not found"
}
```

**Note:** Check email for 6-digit OTP. OTP expires in 10 minutes.

---

## 📌 **4. Reset Password API**

### **POST** `/reset`

Resets user password using email and OTP received via email.

### Request Body
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "password": "NewSecurePass@456"
}
```

**Validation Rules:**
- OTP: Must be 6 digits (received via email)
- Password: Same rules as signup (6+ chars, 1 number, 1 special char)

### Responses

✅ **200 OK** - Password reset successful
```json
{
  "message": "Password reset successful"
}
```

❌ **400 Bad Request** - Invalid OTP
```json
{
  "error": "Invalid OTP"
}
```

❌ **400 Bad Request** - OTP expired
```json
{
  "error": "OTP expired"
}
```

❌ **404 Not Found** - User not found
```json
{
  "error": "User not found"
}
```

---

## 🔐 Authentication

Protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

**Example:**
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  http://localhost:5000/api/auth/profile
```

---

## 📊 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or validation error |
| 401 | Unauthorized - Invalid credentials or missing token |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## 🔗 Complete Request/Response Example

### Signup Flow

**1. Register User**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass@123"
  }'
```

Response:
```json
{
  "message": "User created successfully"
}
```

### Login Flow

**2. Login User**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass@123"
  }'
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Password Reset Flow

**3. Request OTP**
```bash
curl -X POST http://localhost:5000/api/auth/forgot \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

Response:
```json
{
  "message": "OTP sent to email"
}
```

**4. Reset Password with OTP**
```bash
curl -X POST http://localhost:5000/api/auth/reset \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456",
    "password": "NewSecurePass@456"
  }'
```

Response:
```json
{
  "message": "Password reset successful"
}
```

---

## 📝 Error Handling

All errors follow a consistent format:

```json
{
  "error": "Error description"
}
```

The frontend automatically displays these error messages to users via toast notifications.

---

## 🚀 Testing with Frontend

The React frontend (http://localhost:3000) integrates with all these APIs:
- Signup page calls `/signup`
- Login page calls `/login`
- Forgot password page calls `/forgot`
- Reset password page calls `/reset`

Simply use the web interface to test all flows.