type ErrorOptions = {
  message?: string;
  params?: Record<string, unknown>;
  cause?: unknown;
};

export abstract class BaseError extends Error {
  abstract statusCode: number;
  params: Record<string, unknown> = {};

  constructor(options: ErrorOptions = {}) {
    const { message, params = {}, cause } = options;

    super(message, { cause });
    this.name = new.target.name;
    this.params = params;
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

  constructor(options: ErrorOptions = {}) {
    super({
      message: options.message ?? "Internal server error",
      params: options.params,
      cause: options.cause,
    });
  }
}

export class NotFoundError extends BaseError {
  statusCode = 404;
  constructor(options: ErrorOptions = {}) {
    super({
      message: options.message ?? "Resource not found",
      params: options.params,
      cause: options.cause,
    });
  }
}

export class BadRequestError extends BaseError {
  statusCode = 400;

  constructor(options: ErrorOptions = {}) {
    super({
      message: options.message ?? "Bad request",
      params: options.params,
      cause: options.cause,
    });
  }
}

export class ConflictError extends BaseError {
  statusCode = 409;

  constructor(options: ErrorOptions = {}) {
    super({
      message: options.message ?? "Conflict error",
      params: options.params,
      cause: options.cause,
    });
  }
}

export class AuthenticationError extends BaseError {
  statusCode = 401;

  constructor(options: ErrorOptions = {}) {
    super({
      message: options.message ?? "Authentication error",
      params: options.params,
      cause: options.cause,
    });
  }
}

export class ForbiddenError extends BaseError {
  statusCode = 403;

  constructor(options: ErrorOptions = {}) {
    super({
      message: options.message ?? "Access forbidden",
      params: options.params,
      cause: options.cause,
    });
  }
}

export class DatabaseError extends BaseError {
  statusCode = 500; // Internal server error

  constructor(options: ErrorOptions = {}) {
    super({
      message: options.message ?? "Database error",
      params: options.params,
      cause: options.cause,
    });
  }
}
