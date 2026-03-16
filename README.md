# Expense Share API

A RESTful backend API for managing shared expenses, groups, and users. Built with Fastify and Bun, using PostgreSQL for persistent storage. Includes authentication, security best practices, and clear error handling.

## Table of Contents

- [Expense Share API](#expense-share-api)
	- [Table of Contents](#table-of-contents)
	- [Features](#features)
	- [Installation](#installation)
	- [Usage](#usage)
	- [API Endpoints](#api-endpoints)
		- [Authentication](#authentication)
		- [Users](#users)
		- [Groups](#groups)
		- [Expenses](#expenses)
	- [Security](#security)
	- [Project Structure](#project-structure)
	- [License](#license)

## Features

- User registration and authentication (JWT)
- CRUD for users, groups, and expenses
- PostgreSQL integration with parameterized queries
- Input validation and sanitization
- Protected routes (JWT required)
- CORS configuration and HTTP security headers
- Meaningful error handling

## Installation

1. **Clone the repository:**
	```sh
	git clone https://github.com/mirafl0res/expense-share-app.git
	cd expense-share-app
	```

2. **Install dependencies:**
	```sh
	bun install
	```

3. **Set up environment variables:**
	- Copy `.env.example` to `.env` and fill in your database URI, JWT secret, etc.

4. **Run database migrations:**
    - To be implemented

5. **Start the server:**
	```sh
	bun run start
	```

## Usage

- Use tools like Postman or curl to interact with endpoints.

## API Endpoints

### Authentication

- [x] `GET /auth/callback` — Register a new user via Auth0 Universal Login

### Users

- [x] `GET /users/:id` — Get user by ID
- [x] `PATCH /users/:id` — Update user
- [x] `DELETE /users/:id` — Delete user

### Groups

- [x]`POST /groups` — Create group
- [x] `GET /groups/:id` — Get group by ID
- [x] `PATCH /groups/:id` - Update group
- [x] `DELETE /groups/:id` - Delete group

### Expenses

- [x] `POST /expenses` — Create expense
- [x] `GET /expenses/:id` — Get expense by ID
- [x] `PATCH /expenses/:id` - Update expense
- [x] `DELETE /expenses/:id` - Delete expense 

*See code for full endpoint details and request/response formats.*

## Security

- [x] **CORS:** Only allows requests from `CLIENT_ORIGIN` (see `src/index.ts` and `.env.example`).
- [x] **HTTP Security Headers:** Uses [helmet](https://github.com/fastify/helmet) to set headers like `Content-Security-Policy`, `X-Frame-Options`, etc.
- [x] **Input Validation:** Incoming data is validated and sanitized using schemas and libraries like `validator.js`.
- [ ] **Authentication:** JWT-based authentication with hashed passwords (bcrypt).
- [x] **Parameterized Queries:** All database access uses parameterized queries to prevent SQL injection.

## Project Structure

```
src/
  index.ts
  auth/
  controllers/
  errors/
  hooks/
  mappers/
  migrations/
  repository/
  routes/
  schemas/
  services/
  types/
```

- **controllers/**: Route handlers
- **repository/**: Database access logic
- **services/**: Business logic
- **schemas/**: Input validation schemas
- **routes/**: Route definitions

## License

MIT License. See [LICENSE](LICENSE) for details.
