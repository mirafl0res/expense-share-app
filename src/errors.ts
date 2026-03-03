export class NotFoundError extends Error {
  statusCode = 404; // Not found

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = "NotFoundError";
    this.cause = cause;
  }
}

export class ValidationError extends Error {
  statusCode = 400; // Bad request

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = "ValidationError";
    this.cause = cause;
  }
}

export class AuthenticationError extends Error {
  statusCode = 401; // Unauthorized

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = "AuthenticationError";
    this.cause = cause;
  }
}

export class ForbiddenError extends Error {
  statusCode = 403; // Forbidden

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = "ForbiddenError";
    this.cause = cause;
  }
}

export class DatabaseError extends Error {
  statusCode = 500; // Internal server error

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = "DatabaseError";
    this.cause = cause;
  }
}
