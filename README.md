# Employee Review System

This project is a backend application built with Node.js, Express, and MongoDB. It's designed for a hypothetical company's internal system for performance review, where employees can review their peers.

## Features

- User authentication and role-based authorization
- Create new users (employees)
- Assign employees to review another employee
- Delete users
- Employees can view their assigned reviews
- Employees can submit reviews

## Installation and Setup Instructions

### Prerequisites
- Node.js
- MongoDB
- An `.env` file in the root directory for environment variables, with the following:

```
DB_URL=<Your MongoDB URL>
JWT_SECRET=<Your JWT Secret Key>
PORT=<Your Preferred Port>
```
Installation:
1) Clone this repository.
2) cd into the root directory and install the project dependencies:

```
npm install
```
3) Run the application:

```
npm start
```
The server should be running on http://localhost:<Your Preferred Port>.

**API Endpoints:**
POST /auth/signup: Register a new user
POST /auth/signin: Login a user
GET /admin/allusers: Get all users (Admin only)
POST /:user_id/addusertoreview: Assign a user to review another (Admin only)
DELETE /:userid: Delete a user (Admin only)
GET /employee/userstoreview: Get users to review for the logged-in user
POST /:user_id/review: Post a review for a user
  
**Technologies Used:**
Node.js
Express.js
MongoDB
Mongoose
bcrypt
jsonwebtoken
cookie-parser
dotenv
Copy code


**Built With**
Node.js
Express.js
MongoDB
JSON Web Tokens


