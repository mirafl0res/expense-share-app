# Expense Share API

A RESTful backend API for managing shared expenses, groups, and users. Built with Fastify and Bun, using PostgreSQL for persistent storage.
## Table of Contents

- [Expense Share API](#expense-share-api)
	- [Table of Contents](#table-of-contents)
	- [Features](#features)
	- [Installation](#installation)
	- [Usage](#usage)
	- [Docker Support](#docker-support)
	- [API Endpoints](#api-endpoints)
		- [Authentication](#authentication)
		- [Users](#users)
		- [Groups](#groups)
		- [Expenses](#expenses)
	- [Security](#security)
	- [Project Structure](#project-structure)
	- [License](#license)

## Features

- User registration and authentication via Auth0 (OAuth 2.0 & JWT)
- CRUD for users, groups, and expenses
- PostgreSQL integration with parameterized queries
- Input validation and sanitization
- Protected routes (Auth0 JWT required)
- CORS configuration and HTTP security headers
- Dockerfile and docker-compose for containerized setup
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

## Docker Support
- Includes a Dockerfile and `docker-compose.yml for containerized setup.

## API Endpoints

### Authentication

- `GET /auth/authorize` — Register a new user via Auth0 Universal Login

### Users

- `GET /users/:id` — Get user by ID
- `PATCH /users/:id` — Update user
- `DELETE /users/:id` — Delete user

### Groups

- `POST /groups` — Create group
- `GET /groups/:id` — Get group by ID
- `PATCH /groups/:id` - Update group
- `DELETE /groups/:id` - Delete group

### Expenses

- `POST /expenses` — Create expense
- `GET /expenses/:id` — Get expense by ID
- `PATCH /expenses/:id` - Update expense
- `DELETE /expenses/:id` - Delete expense 

*See code for full endpoint details and request/response formats.*

## Security

- **CORS:** Only allows requests from `CLIENT_ORIGIN` (see `src/index.ts` and `.env.example`).
- **HTTP Security Headers:** Uses [helmet](https://github.com/fastify/helmet) to set headers like `Content-Security-Policy`, `X-Frame-Options`, etc.
- **Input Validation:** Incoming data is validated and sanitized using schemas and libraries like `validator.js`.
- **Authentication:** Auth0-based authentication using OAuth 2.0 and JWTs. User login and registration handled via Auth0 Universal Login.
- **Parameterized Queries:** All database access uses parameterized queries to prevent SQL injection.

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
