import type { ErrorObject } from "ajv";
import type { FastifyRequest } from "fastify";

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

export function logError(request: FastifyRequest, error: unknown) {
  if (typeof error === "object" && error !== null && (error as any).cause) {
    return request.log.error((error as any).cause);
  }

  request.log.error(error);
}
