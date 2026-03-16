import type { ErrorObject } from "ajv";
import type { FastifyRequest } from "fastify";
import {
  BadRequestError,
  ConflictError,
  DatabaseError,
  ValidationError,
  type BaseError,
} from "./errors";

export interface FastifyValidationError {
  code: string;
  validation: ErrorObject[];
}

export function formatValidationErrors(validation: ErrorObject[]) {
  return validation.map((error) => ({
    field: error.instancePath || error.params?.missingProperty || "",
    message: error.message,
  }));
}

export function isFastifyValidationError(
  error: unknown,
): error is FastifyValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as any).code === "FST_ERR_VALIDATION" &&
    Array.isArray((error as any).validation)
  );
}

export function logValidationError(
  request: FastifyRequest,
  formatted: unknown,
  error: unknown,
) {
  request.log.error(
    {
      err: {
        errors: formatted,
        cause: error,
      },
    },
    "Validation failed",
  );
}

export function logUnknownError(request: FastifyRequest, error: unknown) {
  if (error instanceof Error) {
    request.log.error({ err: error }, "Unhandled error");
  } else {
    request.log.error(
      { err: { message: String(error), raw: error } },
      "Non-Error thrown",
    );
  }
}

export function logBaseError(request: FastifyRequest, error: BaseError) {
  request.log.error(
    {
      err: {
        name: error.name,
        message: error.message,
        params: error.params,
        cause: error.cause,
        stack: error.stack,
      },
    },
    `Handled error: ${error.name}`,
  );
}

export function mapPostgresError(error: any) {
  switch (error?.errno) {
    case "23505": // unique_violation
      return new ConflictError({
        message: "Duplicate entry: This item already exists.",
        params: { constraint: error.constraint },
        cause: error,
      });
    case "23503": // foreign_key_violation
      return new BadRequestError({
        message: "The referenced item does not exist.",
        params: { constraint: error.constraint },
        cause: error,
      });
    case "23502": // not_null_violation
      return new ValidationError({
        message: "A required field is missing.",
        params: { column: error.column },
        cause: error,
      });
    default:
      return new DatabaseError({
        message: "Unknown database error.",
        cause: error,
      });
  }
}
