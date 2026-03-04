# Task Management System

A full-stack Task Management System built using **Node.js, TypeScript, Prisma, PostgreSQL and Next.js**.

## Features

* User Registration & Login
* JWT Authentication
* Refresh Token system
* Create Task
* Edit Task
* Delete Task
* Toggle Task status
* Pagination
* Search & Filtering
* Responsive UI

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* JWT Authentication
* bcrypt

## API Endpoints

POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout

GET /tasks
POST /tasks
PATCH /tasks/:id
DELETE /tasks/:id
PATCH /tasks/:id/toggle

## How to Run

### Backend

```
cd server
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```
cd client
npm install
npm run dev
```
