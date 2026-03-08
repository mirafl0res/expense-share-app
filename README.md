# Expense Share API

A RESTful backend API for managing shared expenses, groups, and users. Built with Fastify and Bun, using PostgreSQL for persistent storage. Includes authentication, security best practices, and clear error handling.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
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
	```sh
	bun run migrate
	```

5. **Start the server:**
	```sh
	bun run start
	```

## Usage

- The API runs on `http://localhost:3000` by default.
- Use tools like Postman or curl to interact with endpoints.
- For frontend integration, ensure your frontend origin matches the CORS configuration.

## API Endpoints

### Authentication

- `POST /users/register` — Register a new user
- `POST /users/login` — Login and receive JWT tokens

### Users

- `GET /users/:id` — Get user by ID
- `PUT /users/:id` — Update user
- `DELETE /users/:id` — Delete user

### Groups

- `GET /groups` — List groups
- `POST /groups` — Create group
- `GET /groups/:id` — Get group by ID

### Expenses

- `GET /expenses` — List expenses
- `POST /expenses` — Create expense
- `GET /expenses/:id` — Get expense by ID

*See code for full endpoint details and request/response formats.*

## Security

- **CORS:** Only allows requests from `http://localhost:3000` (see `src/index.ts`).
- **HTTP Security Headers:** Uses [helmet](https://github.com/fastify/helmet) to set headers like `Content-Security-Policy`, `X-Frame-Options`, etc.
- **Input Validation:** All incoming data is validated and sanitized using schemas and libraries like `validator.js`.
- **Authentication:** JWT-based authentication with hashed passwords (bcrypt).
- **Parameterized Queries:** All database access uses parameterized queries to prevent SQL injection.

## Project Structure

```
src/
  auth.ts
  index.ts
  controllers/
  errors/
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
