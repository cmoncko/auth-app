# 🔐 Full Authentication System — Flask + React + Tailwind + MySQL

A modern, production-ready authentication system with **Flask** backend and **React (Vite)** frontend.  
Implements **Signup, Login, Forgot Password (OTP-based reset)** with a clean, decoupled API architecture.

Perfect for portfolio projects and learning full-stack development.

---

## ✨ Features

✅ **User Authentication**
- Email & username login support
- JWT token-based sessions
- Secure password hashing (bcrypt)

✅ **User Registration**
- Email validation
- Strong password requirements (6+ chars, number, special char)
- Duplicate email/username detection

✅ **Password Recovery**
- OTP-based password reset
- Email verification
- Expiring OTP tokens

✅ **API Integration**
- RESTful Flask API
- Axios HTTP client
- Error handling & validation
- CORS enabled

✅ **Frontend UI**
- Apple-like minimal design
- TailwindCSS styling
- Form validation with error messages
- Toast notifications
- Protected routes
- Responsive design

---

## 🛠 Tech Stack

### Backend
- **Framework**: Flask 2.x
- **Database**: MySQL with SQLAlchemy ORM
- **Authentication**: Flask-JWT-Extended
- **Password Hashing**: Werkzeug
- **Email**: SMTP (Gmail)
- **Validation**: Custom validators

### Frontend
- **Library**: React 18
- **Bundler**: Vite
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM

---

## 📂 Project Structure

```
auth-app/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   └── auth_routes.py
│   │   ├── models/
│   │   │   └── user.py
│   │   ├── utils/
│   │   │   ├── hash.py
│   │   │   ├── email_service.py
│   │   │   ├── otp.py
│   │   │   └── validators.py
│   │   └── database.py
│   ├── config.py
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosConfig.js
│   │   ├── components/
│   │   │   ├── InputField.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── AuthCard.jsx
│   │   │   ├── ToastContainer.jsx
│   │   │   └── Spinner.jsx
│   │   ├── hooks/
│   │   │   └── useToast.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   ├── ResetPasswordPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── routes/
│   │   │   ├── Router.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── utils/
│   │   │   └── validators.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.cjs
│   ├── package.json
│   └── README.md
│
├── docs/
│   └── API.md
│
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL 5.7+

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your MySQL, email, and JWT settings

# Initialize database
flask db init
flask db migrate
flask db upgrade

# Run server
flask run
```

Backend runs on: `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs on: `http://localhost:3000`

---

## 📡 API Endpoints

### Authentication

**POST** `/api/signup`
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**POST** `/api/login`
```json
{
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```
Or with username:
```json
{
  "username": "johndoe",
  "password": "SecurePass@123"
}
```

**POST** `/api/forgot`
```json
{
  "email": "john@example.com"
}
```

**POST** `/api/reset`
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "password": "NewPass@123"
}
```

---

## 🔐 Validation Rules

### Email
- Standard email format (RFC 5322)
- Example: `user@domain.com`

### Password
- Minimum 6 characters
- At least 1 number (0-9)
- At least 1 special character (!@#$%^&*)
- Example: `SecurePass@123`

### Username
- Minimum 3 characters
- No duplicates allowed
- Example: `johndoe`

---

## 🔧 Environment Variables

### Backend (.env)
```
FLASK_ENV=development
FLASK_DEBUG=True
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DB=auth_app
JWT_SECRET_KEY=your_jwt_secret_key
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8000/api
```

---

## 📖 Key Components

### Backend - auth_routes.py
Handles all authentication endpoints with proper validation and error handling.

### Frontend - Pages
- **LoginPage**: Email/username + password login
- **SignupPage**: New user registration with validation
- **ForgotPasswordPage**: OTP request
- **ResetPasswordPage**: Password reset with OTP

### Frontend - Components
- **InputField**: Reusable input with label, validation, error display
- **Button**: Primary and secondary button variants
- **AuthCard**: Centered form container
- **ToastContainer**: Success/error notifications with icons
- **Spinner**: Loading indicator

---

## 🧪 Testing

### Manual Testing

1. **Signup Flow**
   - Create account with valid credentials
   - Try duplicate email/username (should fail)
   - Try weak password (should fail)

2. **Login Flow**
   - Login with email or username
   - Try invalid credentials
   - Verify JWT token in localStorage

3. **Password Reset**
   - Request OTP for registered email
   - Check email for OTP
   - Reset with valid OTP
   - Login with new password

---

## 🎨 Styling

All styling uses **TailwindCSS** utility classes. No custom CSS needed.

- **Colors**: Minimalist gray/white palette
- **Spacing**: Consistent padding/margins using Tailwind scale
- **Shadows**: Soft, subtle shadows for depth
- **Borders**: Rounded corners (lg/xl) for modern look
- **Animations**: Fade in, slide in transitions

---

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing
- ✅ CORS protection
- ✅ Input validation
- ✅ OTP expiration (typically 10 min)
- ✅ Secure headers
- ✅ Protected routes on frontend

---

## 📝 API Documentation

See [docs/API.md](./docs/API.md) for complete API reference.

---

## 🤝 Contributing

Feel free to fork, improve, and submit pull requests!

---

## 📄 License

MIT License - feel free to use for personal and commercial projects.

---

## 💡 Next Steps / Enhancements

- [ ] Add two-factor authentication (2FA)
- [ ] Social login (Google, GitHub)
- [ ] Email verification on signup
- [ ] Rate limiting on login attempts
- [ ] User profile management
- [ ] Refresh token rotation
- [ ] Admin dashboard
- [ ] Database backup strategy
- [ ] Monitoring & logging
- [ ] Unit & integration tests

---

**Built with ❤️ for learning and portfolio purposes.**

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
