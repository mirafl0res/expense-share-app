export class NotFoundError extends Error {
  statusCode = 404; // Not found

  constructor(message: string, cause?: Error) {
    super(message, { cause });
    this.name = "NotFoundError";
  }
}

export class ValidationError extends Error {
  statusCode = 400; // Bad request

  constructor(message: string, cause?: Error) {
    super(message, { cause });
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends Error {
  statusCode = 401; // Unauthorized

  constructor(message: string, cause?: Error) {
    super(message, { cause });
    this.name = "AuthenticationError";
  }
}

export class ForbiddenError extends Error {
  statusCode = 403; // Forbidden

  constructor(message: string, cause?: Error) {
    super(message, { cause });
    this.name = "ForbiddenError";
  }
}

export class DatabaseError extends Error {
  statusCode = 500; // Internal server error

  constructor(message: string, cause?: Error) {
    super(message, { cause });
    this.name = "DatabaseError";
  }
}
