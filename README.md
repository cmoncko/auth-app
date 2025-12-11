#🚀 Full-Stack Login System

Flask (Python 3.11) + MySQL + React (Vite) + TailwindCSS

A clean and minimal full-stack authentication system built for demo and evaluation purposes.
Includes user Signup, Login, Forgot Password, JWT authentication, and complete project documentation.

🔥 Features
Backend (Flask + MySQL)

User registration with hashed passwords

Login with JWT tokens

Secure "Forgot Password" workflow with email OTP

Validation & error handling

Clean folder structure

.env powered configuration

Uses SQLAlchemy ORM

Frontend (React + Vite + Tailwind)

Responsive UI

Login form

Signup form

Forgot password flow

Reusable components

API calls using Axios

🏗️ Tech Stack
Backend

Python 3.11

Flask

Flask-JWT-Extended

Flask-Mail

SQLAlchemy

MySQL

Frontend

React 18

Vite

TailwindCSS

Axios

📁 Project Structure
Backend
backend/
│── app.py
│── config.py
│── requirements.txt
│── .env
│── /routes
│── /models
│── /utils
│── /tests

Frontend
frontend/
│── index.html
│── package.json
│── vite.config.js
│── tailwind.config.js
│── /src
      ├── /pages
      ├── /components
      ├── /services

🛠️ Setup & Installation
1️⃣ Clone Repo
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

🐍 Backend Setup (Flask)
Create Virtual Environment
cd backend
python3 -m venv venv
source venv/bin/activate

Install Dependencies
pip install -r requirements.txt

Environment Variables

Create a .env file:

SECRET_KEY=your_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpass
DB_NAME=auth_demo  
MAIL_USERNAME=your@gmail.com
MAIL_PASSWORD=your_app_password

Run Backend
flask run


Backend runs at:
📌 http://localhost:5000

⚛️ Frontend Setup (React)
cd frontend
npm install
npm run dev


Frontend runs at:
📌 http://localhost:5173

🧪 API Documentation

Full API docs available here:
📄 API.md

🔄 Flow Description

User authentication flow explanation available here:
📄 FLOW.md

🗄️ Database Schema Diagram (Mermaid)
erDiagram
    USERS {
        int id PK
        varchar username
        varchar email
        varchar password_hash
        varchar otp
        datetime otp_expiry
        datetime created_at
    }

🤝 Contribution Guide

Fork the repo

Create a new branch

Commit changes

Create a pull request

📜 License

This project is open-source and free to use.

🧑‍💻 Author

Shiko Ignatious
Full-Stack Developer | DevOps | Flutter
