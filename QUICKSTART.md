# 🚀 Quick Start - 5 Simple Steps

## Backend Setup

### 1️⃣ Create Virtual Environment
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# OR
source venv/bin/activate  # Linux/Mac
```

### 2️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 3️⃣ Create .env File
```bash
cp .env.example .env
```

**Sample .env format:**
```env
# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# MySQL Database
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DB=auth_app

# JWT Secret Key (change this to something secure)
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Gmail example)
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
```

**Note:** For Gmail users, generate an [App Password](https://myaccount.google.com/apppasswords) (16 characters) instead of using your regular password.

### 4️⃣ Create Database Tables
```bash
python -c "from app import app, db; app_ctx = app.app_context(); app_ctx.push(); db.create_all()"
```

### 5️⃣ Run Server
```bash
flask run
```
Backend ready at: **http://localhost:8000**

---

## Frontend Setup

### 1️⃣ Navigate to Frontend
```bash
cd frontend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create .env.local
```bash
echo "VITE_API_URL=http://localhost:5000/api/auth" > .env.local
```

### 4️⃣ (Skip - Frontend has no database)

### 5️⃣ Run Server
```bash
npm run dev
```
Frontend ready at: **http://localhost:3000**

---

## ✅ Done!

- ✅ Backend running on http://localhost:8000
- ✅ Frontend running on http://localhost:3000
- ✅ Ready to test signup, login, and password reset

Open http://localhost:3000 in your browser and start using the app! 🎉
