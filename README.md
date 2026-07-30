# Capital View — Backend

This is the backend API for Capital View, a personal finance tracker. It handles user authentication and transaction management.

## Features

- User signup and login (public)
- Passwords hashed with bcrypt
- JWT-protected transaction routes (private)
- Users can only access, create, update, or delete their **own** transactions

## Live Demo

https://capital-view-frontend.vercel.app

## Tech Stack

- Node.js
- Express
- MongoDB
- JWT (jsonwebtoken)
- bcrypt

## Data Models

### User

| Field    | Type     | Notes              |
| -------- | -------- | ------------------ |
| \_id     | ObjectId | Auto-generated     |
| name     | String   |                    |
| email    | String   |                    |
| password | String   | Hashed with bcrypt |

### Transaction

| Field  | Type     | Notes                      |
| ------ | -------- | -------------------------- |
| \_id   | ObjectId | Auto-generated             |
| userid | ObjectId | References the User's \_id |
| type   | String   |                            |
| amount | Number   |                            |
| title  | String   |                            |
| date   | Date     |                            |

## Getting Started

### Prerequisites

- Node.js and Yarn installed
- A MongoDB instance (local or hosted, e.g. MongoDB Atlas)

### Installation

```bash
git clone https://github.com/bguragain1023-web/CapitalView-Backend
cd CapitalView-Backend
yarn install
```

### Environment Variables

Create a `.env` file in the project root:

```dotenv
JWT_SECRET=your_jwt_secret_here
MONGO_URL=your_mongodb_connection_string_here
```

### Running Locally

```bash
yarn dev
```

By default the server runs on `http://localhost:8000` (matching the frontend's `VITE_ROOT_API`).

## API Endpoints

### User Routes (public)

| Method | Endpoint               | Description |
| ------ | ---------------------- | ----------- |
| POST   | `/api/v1/users/`       | Sign up     |
| POST   | `/api/v1/users/login/` | Log in      |

### Transaction Routes (private — requires JWT)

| Method | Endpoint                  | Description                           |
| ------ | ------------------------- | ------------------------------------- |
| POST   | `/api/v1/transaction/`    | Create a new transaction              |
| GET    | `/api/v1/transaction/`    | Get the logged-in user's transactions |
| DELETE | `/api/v1/transaction/`    | Delete a transaction                  |
| PATCH  | `/api/v1/transaction/:id` | Update a transaction by ID            |

> All transaction routes are scoped to the authenticated user — a user can only read, update, or delete their own transactions.

## License

This project is licensed under the MIT License.

## Author

Brazesh Guragain:https://www.brazeshguragain.com

Linkedin: https://www.linkedin.com/in/brazesh-guragain-32a6661b0/

Github: https://github.com/bguragain1023-web
