import type { FastifyReply, FastifyRequest } from "fastify";
import { BaseError, InternalError, ValidationError } from "./errors";
import {
  formatValidationErrors,
  isFastifyValidationError,
  logBaseError,
  logUnknownError,
  logValidationError,
} from "./helpers";

export function fastifyErrorHandler(
  error: any,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (isFastifyValidationError(error)) {
    const formatted = formatValidationErrors(error.validation);

    logValidationError(request, formatted, error);

    const validationError = new ValidationError({
      params: { errors: formatted },
      cause: error,
    });

    return reply
      .status(validationError.statusCode)
      .send(validationError.toPublicError());
  }

  if (!(error instanceof BaseError)) {
    logUnknownError(request, error);

    const unknownError = new InternalError({
      message: "An unknown error occurred",
      cause: error,
    });

    return reply
      .status(unknownError.statusCode)
      .send(unknownError.toPublicError());
  }

  logBaseError(request, error);

  return reply.status(error.statusCode).send(error.toPublicError());
}