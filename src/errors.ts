export abstract class BaseError extends Error {
  abstract statusCode: number;
  params: Record<string, unknown> = {};

  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = new.target.name;
  }

  toPublicError() {
    return {
      success: false,
      statusCode: this.statusCode,
      message: this.message,
      params: this.params,
    };
  }
}

export class InternalError extends BaseError {
  statusCode = 500;

  constructor(
    message: string = "Internal server error",
    params: Record<string, unknown> = {},
    cause?: unknown,
  ) {
    super(message, cause);
    this.params = params;
  }
}

export class NotFoundError extends BaseError {
  statusCode = 404;

  constructor(
    message: string = "Resource not found",
    params: Record<string, unknown> = {},
    cause?: unknown,
  ) {
    super(message, cause);
    this.params = params;
  }
}

export class BadRequestError extends BaseError {
  statusCode = 400;

  constructor(
    message: string = "Bad request",
    params: Record<string, unknown> = {},
    cause?: unknown,
  ) {
    super(message, cause);
    this.params = params;
  }
}

export class ConflictError extends BaseError {
  statusCode = 409;
  constructor(
    message: string = "Conflict",
    params: Record<string, unknown> = {},
    cause?: unknown,
  ) {
    super(message, cause);
    this.params = params;
  }
}

export class AuthenticationError extends BaseError {
  statusCode = 401;

  constructor(
    message: string = "Not authenticated",
    params: Record<string, unknown> = {},
    cause?: unknown,
  ) {
    super(message, cause);
    this.params = params;
  }
}

export class ForbiddenError extends BaseError {
  statusCode = 403;

  constructor(
    message: string = "Access forbidden",
    params: Record<string, unknown> = {},
    cause?: unknown,
  ) {
    super(message, cause);
    this.params = params;
  }
}

export class DatabaseError extends BaseError {
  statusCode = 500; // Internal server error

  constructor(
    message: string = "Database error",
    params: Record<string, unknown> = {},
    cause?: unknown,
  ) {
    super(message, cause);
    this.params = params;
  }
}
