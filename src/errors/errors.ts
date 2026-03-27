type ErrorOptions = {
  message?: string;
  publicMessage?: string;
  params?: Record<string, unknown>;
  cause?: unknown;
};

export abstract class BaseError extends Error {
  abstract readonly statusCode: number;
  abstract readonly code: string;
  readonly params: Record<string, unknown>;
  publicMessage: string;

  constructor(defaultMessage: string, options: ErrorOptions = {}) {
    super(options.message ?? defaultMessage, { cause: options.cause });

    this.name = new.target.name;
    this.params = options.params ?? {};
    this.publicMessage = options.publicMessage ?? defaultMessage;
  }

  toPublicError() {
    return {
      success: false,
      statusCode: this.statusCode,
      code: this.code,
      message: this.publicMessage,
      params: this.params,
    };
  }
}

export class InternalError extends BaseError {
  statusCode = 500;
  code = "INTERNAL_ERROR";

  constructor(options: ErrorOptions = {}) {
    super("Internal server error", options);
    // Always set a generic public message for 5xx errors to prevent leaking sensitive internal info.
    this.publicMessage = "Internal server error";
  }
}

export class DatabaseError extends BaseError {
  statusCode = 500;
  code = "DATABASE_ERROR";

  constructor(options: ErrorOptions = {}) {
    super("Database error", options);
    // Always set a generic public message for 5xx errors to prevent leaking sensitive internal info.
    this.publicMessage = "Internal server error";
  }
}

export class NotFoundError extends BaseError {
  statusCode = 404;
  code = "NOT_FOUND";

  constructor(options: ErrorOptions = {}) {
    super("Resource not found", options);
  }
}

export class BadRequestError extends BaseError {
  statusCode = 400;
  code = "BAD_REQUEST";

  constructor(options: ErrorOptions = {}) {
    super("Bad request", options);
  }
}

export class ValidationError extends BaseError {
  statusCode = 400;
  code = "VALIDATION_ERROR";

  constructor(options: ErrorOptions = {}) {
    super("Validation failed", options);
  }
}

export class ConflictError extends BaseError {
  statusCode = 409;
  code = "CONFLICT";

  constructor(options: ErrorOptions = {}) {
    super("Resource already exists", options);
  }
}

export class AuthenticationError extends BaseError {
  statusCode = 401;
  code = "AUTHENTICATION_ERROR";

  constructor(options: ErrorOptions = {}) {
    super("Authentication error", options);
  }
}

export class ForbiddenError extends BaseError {
  statusCode = 403;
  code = "FORBIDDEN";

  constructor(options: ErrorOptions = {}) {
    super("Access forbidden", options);
  }
}
