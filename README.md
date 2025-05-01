# Taskify API 📝

Task Manager application built with Node.js, Express, and MongoDB. Supports user registration, login, and route protection using JWT. Each task is associated with the user who created it.

## 🌐 Hosted API

[Taskify API - Render](https://your-api-url-here.com/) <!-- Change to your deployed link -->

---

## ✅ Setup Basic Express Server

- [ ] import express and create app
- [ ] set port (5000) and setup listen
- [ ] setup express.json() middleware
- [ ] install & use dotenv for environment variables

---

## ✅ Connect to MongoDB

- [ ] install mongoose
- [ ] setup `.env` with `MONGO_URI`
- [ ] create `db.js` file in `config/` and connect
- [ ] import and call it in server.js

---

## ✅ Auth Features

### User Model

- [ ] name, email, password fields
- [ ] validate email (validator.js)
- [ ] hash password using bcrypt before save

### Register & Login

- [ ] POST `/api/v1/auth/register`
- [ ] POST `/api/v1/auth/login`
- [ ] Validate input and return error if missing
- [ ] Return token in secure cookie
- [ ] JWT_SECRET and JWT_LIFETIME in .env

### Logout

- [ ] GET `/api/v1/auth/logout`
- [ ] Clear cookie token

---

## ✅ Authentication & Authorization

- [ ] Create JWT utils (sign, verify)
- [ ] Attach token to response cookie
- [ ] Create authMiddleware to protect routes
- [ ] Create permission check function (optional)

---

## ✅ Task Features

### Task Model

- [ ] title, description, status (pending, done), dueDate
- [ ] reference to user

### Task Routes

- [ ] POST `/api/v1/tasks` – create task
- [ ] GET `/api/v1/tasks` – get user tasks
- [ ] GET `/api/v1/tasks/:id` – get single task
- [ ] PUT `/api/v1/tasks/:id` – update task
- [ ] DELETE `/api/v1/tasks/:id` – delete task

---

## ✅ Middleware & Error Handling

- [ ] 404 middleware
- [ ] Global errorHandler middleware
- [ ] Use express-async-errors

---

## ✅ Security Packages

- [ ] helmet
- [ ] xss-clean
- [ ] express-rate-limit
- [ ] express-mongo-sanitize
- [ ] cors

---

## ✅ Postman Collection

- [ ] Export and import in Postman
- [ ] Test all routes (register, login, tasks)

---

## ✅ Deployment (Render/Heroku)

- [ ] Create `start` and `dev` scripts
- [ ] Add `engines.node` in package.json
- [ ] Setup environment variables on platform
- [ ] Use `web: node server.js` in Procfile (for Heroku)
- [ ] Connect GitHub and deploy
