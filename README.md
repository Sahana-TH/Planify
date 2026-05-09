# 📋 Planify - Full Stack Task Management App

A modern, full-stack todo application built with React.js, Node.js, and MongoDB.

## 🌐 Live Demo

- **Frontend:** https://planify-frontend.vercel.app
- **Backend API:** https://planify-backend-gv6w.onrender.com

## ✨ Features

- 🔐 JWT Authentication (Register/Login)
- ✅ Create, Edit, Delete, Complete Tasks
- 🔥 Task Priority (High/Medium/Low)
- 📅 Due Dates
- 🔍 Search and Filter Tasks
- 🌙 Dark/Light Mode
- 🔔 Toast Notifications
- 📊 Dashboard Summary
- 👤 Profile Page
- 📱 Responsive UI

## 🛠 Tech Stack

| Frontend     | Backend    | Database      | Deployment |
| ------------ | ---------- | ------------- | ---------- |
| React.js     | Node.js    | MongoDB Atlas | Vercel     |
| Tailwind CSS | Express.js | Mongoose      | Render     |
| React Router | JWT Auth   |               |            |
| Axios        | bcryptjs   |               |            |

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas account

### Installation

1. Clone the repo
   \`\`\`bash
   git clone https://github.com/Sahana-TH/Planify.git
   cd Planify
   \`\`\`

2. Install backend dependencies
   \`\`\`bash
   cd server
   npm install
   \`\`\`

3. Setup backend `.env`
   \`\`\`env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   PORT=5000
   \`\`\`

4. Install frontend dependencies
   \`\`\`bash
   cd ../client
   npm install
   \`\`\`

5. Run both servers
   \`\`\`bash

# Terminal 1 - Backend

cd server
npm run dev

# Terminal 2 - Frontend

cd client
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
Planify/
├── client/ # React Frontend
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── services/
└── server/ # Node.js Backend
├── controllers/
├── models/
├── routes/
└── middleware/
\`\`\`

## 👤 Author

**Sahana TH**

- GitHub: [@Sahana-TH](https://github.com/Sahana-TH)
