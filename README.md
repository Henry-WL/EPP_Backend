# Event Management Backend API

This is the backend for an event management system built using **Node.js**, **Express**, **TypeScript**, and **Mongoose**. The backend provides an API for managing users, events, and payments.

[Frontend Repository:](https://github.com/Henry-WL/EPP_Frontend)

Developed by **Henry Westhoff-Lewis**

**Note: When a user is created, in MongoDB the user object will contain isStaff, this is automatically set to false, if you want the user to be able to create events, this must be set to true in MongoDB**


## Table of Contents
- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Event Routes](#event-routes)
  - [Payment Routes](#payment-routes)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## About The Project

This project is the backend for a comprehensive event management system built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** (using **Mongoose**). The backend supports key features like user authentication, event creation and management, payment handling through **Stripe**, and Google Calendar integration. The API is designed to provide a secure and scalable platform for creating, joining, and managing events, while ensuring smooth payment processes and calendar syncing. JWT-based authentication secures access to routes for authenticated users.

## Features

- User authentication (signup, login)
- Event management (CRUD operations on events)
- Payment handling with Stripe API
- Secure routes using JWT authentication

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **TypeScript**: Type-safe JavaScript
- **Mongoose**: MongoDB object modeling for Node.js
- **Stripe**: Payment processing API
- **JWT (JSON Web Token)**: Authentication and authorization

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Henry-WL/EPP_Backend.git
   cd EPP_DIR_NAME
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file in the root directory with the following:

   ```env
   DB_URI=<your-mongodb-uri>
   JWT_KEY=<your-jwt-secret>
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

   The backend will be running at `http://localhost:3000`.

## Environment Variables

- `DB_URI`: MongoDB connection string.
- `JWT_KEY`: Secret key for signing JWTs.
- `STRIPE_SECRET_KEY`: Stripe API secret key for payment processing.

## API Endpoints

### User Routes

**Note all user endpoints lead with /api, if you are using postman to test a route it will lead with /api/${route}/. E.g. in postman GET http://localhost:3000/api/events will return a JSON of all events**

| Method | Endpoint          | Description                       |
|--------|-------------------|-----------------------------------|
| POST   | `/user/signup`     | Register a new user               |
| POST   | `/user/login`      | Login an existing user            |
| PATCH  | `/user/:userId`    | Update user profile (username, email, etc.) |
| GET    | `/user/:userId`    | Get user profile details          |

### Event Routes

| Method | Endpoint                    | Description                                |
|--------|-----------------------------|--------------------------------------------|
| GET    | `/events`                   | Retrieve all events                       |
| GET    | `/events/:eventId`           | Retrieve details of a single event        |
| GET    | `/events/userEvents/:userId`           | Get events users is an attendee of        |
| POST   | `/events`                   | Create a new event                        |
| DELETE | `/events/:eventId`           | Delete an event                           |
| POST   | `/events/join/:eventId`      | Join an event (requires payment or free)  |
| POST   | `/events/leave/:eventId`     | Leave an event                            |

### Payment Routes

| Method | Endpoint                        | Description                                   |
|--------|----------------------------------|-----------------------------------------------|
| POST   | `/payment/create-payment-intent` | Create a Stripe Payment Intent for an event   |

## Error Handling

This API uses custom error handling middleware to catch and return errors as JSON. Common error responses include:

- **404 Not Found**: If a requested resource (like an event or user) does not exist.
- **400 Bad Request**: When required fields are missing or invalid.
- **401 Unauthorized**: When the JWT token is missing or invalid.

## Testing

You can use **Postman** or **cURL** to manually test the API endpoints.
