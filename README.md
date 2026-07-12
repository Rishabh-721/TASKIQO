# Taskiqo

Taskiqo is a MERN stack role-based task management system that enables organizations to manage users and tasks through Role-Based Access Control (RBAC).

---

## 🚀 Features

### Authentication
- User Signup
- User Login
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Session Version Management

### User Management
- Super Admin
- Admin
- Employee
- User Approval System
- Activate/Deactivate Users
- Promote/Demote Users
- Soft Delete & Restore Users

### Task Management
- Create Task
- Update Task
- Delete Task
- Assign Employees
- Reassign Employees
- Task Priority
- Due Date Management
- Task Listing

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Frontend (Upcoming)
- React
- React Router
- Axios

---

## 📂 Project Structure

```
Backend/
├── 01_Database/
├── 02_Model/
├── 03_Middleware/
├── 04_Utils/
├── 05_Controller/
├── 06_Routes/
├── Server.js
└── package.json
```

---

## 🔐 Roles

### Super Admin
- Manage users
- Activate/Deactivate accounts
- Promote/Demote users
- View all tasks
- Reassign Admin

### Admin
- Create tasks
- Update tasks
- Delete tasks
- Assign/Reassign employees

### Employee
- Login after approval
- View assigned tasks

---

## 📌 Current Status

- ✅ Authentication Module Completed
- ✅ User Management Module Completed
- ✅ Task Management Backend Completed
- 🔄 Task Workflow & Dashboard APIs (Next)
- ⏳ React Frontend

---

## 📅 Roadmap

- [x] Authentication
- [x] User Management
- [x] Task CRUD
- [ ] Task Workflow
- [ ] Dashboard
- [ ] React Frontend
- [ ] Deployment

---

## 📄 License

This project is built for learning and portfolio purposes.