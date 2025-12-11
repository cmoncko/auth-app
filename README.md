# 🔐 Full Authentication System — Flask (Python) + React (Vite) + Tailwind + MySQL

A clean, production-ready authentication system built with **Flask** for the backend and **React (Vite)** for the frontend.  
This project implements **Signup, Login, Forgot Password (OTP-based reset)** using a fully decoupled API architecture.

Designed as a **technical demonstration** for hiring teams, showing your ability to build:
- REST APIs  
- JWT-based authentication  
- Email OTP flows  
- Secure password hashing  
- Frontend integration  
- MySQL-backed backend  
- Component-based UI  

---

## 🚀 Tech Stack

### **Backend (Python + Flask)**
- Flask 2.x  
- Flask-CORS  
- Flask-Migrate  
- Flask-JWT-Extended  
- SQLAlchemy ORM  
- MySQL (pymysql)  
- python-decouple  
- SMTP Email (Gmail)

### **Frontend (React + Vite)**
- React 18  
- Vite  
- TailwindCSS  
- Axios  
- React Hooks  

---

## 📁 Project Structure
│
├── backend/
│ ├── app.py
│ ├── config.py
│ ├── routes/
│ ├── models/
│ ├── utils/
│ ├── requirements.txt
│ └── .env.example
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
└── docs/
├── API.md
├── FLOW.md
└── schema.md


---

## 🌱 Features

### 🔑 **Authentication**
- User Signup  
- Login with email + password  
- Password hashing with Werkzeug  
- JWT token generation (access token)

### 🔐 **Password Reset**
- Forgot password request  
- OTP generation (6-digit code)  
- OTP delivered via email  
- OTP expiry validation  
- Password reset handler  

### 🛡 Security
- Hashed passwords (never stored as plain text)  
- JWT tokens for user sessions  
- Environment variables for secrets  
- CORS protection  
- Email OTP with expiry  

---
