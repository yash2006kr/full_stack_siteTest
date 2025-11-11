# MERN Login-Register App

A simple full-stack MERN application with user registration and login functionality.

## 🚀 Quick Start

**For complete setup instructions, see [SETUP.md](./SETUP.md)**

### Quick Setup (All in VS Code)

1. **Get MongoDB Connection String** (5 min in browser)
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Create free cluster and get connection string

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with MONGO_URI and JWT_SECRET
   npm run check-setup  # Verify setup
   npm run seed         # Seed sample users
   npm start            # Start server
   ```

3. **Frontend Setup** (in new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Test the App**
   - Open https://full-stack-sitetest-frontend.onrender.com
   - Login with: `john.doe@example.com` / `password123`

## 📁 Project Structure

```
/backend
  - server.js
  - seed.js
  - check-setup.js
  - models/User.js
  - routes/auth.js

/frontend
  - src/App.js
  - src/components/Register.js
  - src/components/Login.js
```

## 📝 Environment Variables

Create `backend/.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## API Endpoints

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login an existing user

## Deployment

- Backend: Deploy to Render
- Database: MongoDB Atlas
- Frontend: Deploy to GitHub Pages

## Technologies Used

- Backend: Node.js, Express, MongoDB, Mongoose, bcrypt, JWT
- Frontend: React, Axios, React Router
