# 💰 Personal Expense Tracker

A full-stack expense tracking application built with the **MERN stack** (MongoDB, Express, React, Node.js). Add, view, and delete expenses with real-time total calculation — clean UI, RESTful API, and cloud-hosted database.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

🔗 **Live Demo:** [expense-tracker-kappa-one-25.vercel.app](https://expense-tracker-kappa-one-25.vercel.app) &nbsp;|&nbsp; 🔗 **API:** [expense-tracker-vg0n.onrender.com](https://expense-tracker-vg0n.onrender.com)

---
## 📸 Screenshot

![Expense Tracker Dashboard](./screenshots/dashboard.png)

## ✨ Features

| Feature | Description |
|---|---|
| ➕ Add Expense | Log expenses with amount, description, category, and date |
| 📋 View Expenses | See all expenses in a clean, chronological list |
| 🧮 Live Total | Total amount spent updates automatically |
| 🗑️ Delete Expense | Remove any expense with a single click |
| 📱 Responsive UI | Works smoothly on desktop and mobile |
| ☁️ Cloud Database | Data persists via MongoDB Atlas |

---

## 🛠️ Tech Stack

**Frontend**
- React 18
- Axios (HTTP client)
- Plain CSS (responsive, no external UI library)

**Backend**
- Node.js + Express
- Mongoose (MongoDB ODM)
- CORS + dotenv

**Database**
- MongoDB Atlas (cloud-hosted)

**Deployment**
- Frontend → Vercel
- Backend → Render

---

## 📂 Project Structure

```
expense-tracker/
├── backend/
│   ├── models/
│   │   └── Expense.js          # Mongoose schema
│   ├── routes/
│   │   └── expenses.js         # API route handlers
│   ├── server.js               # App entry point
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.js
│   │   │   ├── ExpenseList.js
│   │   │   └── ExpenseItem.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env.example
├── screenshots/
└── README.md
```

---

## 🔌 API Reference

Base URL (production): `https://expense-tracker-vg0n.onrender.com`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/expenses` | Retrieve all expenses (sorted by date, newest first) |
| `POST` | `/api/expenses` | Create a new expense |
| `DELETE` | `/api/expenses/:id` | Delete an expense by ID |

**Request body — `POST /api/expenses`**
```json
{
  "amount": 250,
  "description": "Groceries",
  "category": "Food",
  "date": "2026-07-13"
}
```

**Response — `201 Created`**
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "amount": 250,
  "description": "Groceries",
  "category": "Food",
  "date": "2026-07-13T00:00:00.000Z",
  "createdAt": "2026-07-13T10:15:00.000Z",
  "updatedAt": "2026-07-13T10:15:00.000Z"
}
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works) or a local MongoDB instance

### 1. Clone the repository
```bash
git clone https://github.com/Sai2960/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Edit `.env` with your MongoDB connection string:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
CLIENT_ORIGIN=http://localhost:3000
```
```bash
npm run dev
```
API runs at `http://localhost:5000`.

**`server.js`**
```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const expenseRoutes = require('./routes/expenses');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expense-tracker';
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running');
});

app.use('/api/expenses', expenseRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
cp .env.example .env
```
Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api/expenses
```
```bash
npm start
```
App runs at `http://localhost:3000`.

---

## ☁️ Deployment

| Layer | Platform | Live URL | Notes |
|---|---|---|---|
| Frontend | [Vercel](https://vercel.com) | https://expense-tracker-kappa-one-25.vercel.app | Root directory set to `frontend`; `REACT_APP_API_URL` env var points to the Render backend |
| Backend | [Render](https://render.com) | https://expense-tracker-vg0n.onrender.com | Root directory set to `backend`; `MONGO_URI` and `CLIENT_ORIGIN` (Vercel URL, no trailing slash) set as environment variables |
| Database | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | — | Network Access whitelists `0.0.0.0/0` for cloud deployment access |

> **Note:** React environment variables are baked in at build time. If you change `REACT_APP_API_URL` after deploying, you must trigger a redeploy for the change to take effect.
>
> **Note:** The Render free tier spins down after inactivity — the first request after idling can take 50+ seconds to respond.

---

## 🗺️ Roadmap

- [ ] Edit existing expenses
- [ ] Filter by category / date range
- [ ] Monthly spending charts
- [ ] User authentication (multi-user support)
- [ ] Export expenses to CSV

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Sai Chandorkar**
GitHub: [@Sai2960](https://github.com/Sai2960)
