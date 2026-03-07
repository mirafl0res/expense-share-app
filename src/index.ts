import { fastify, type FastifyInstance } from "fastify";
import { expensesRoutes, usersRoutes, groupsRoutes } from "./routes";
import db from "./repository/db";
import { BaseError, InternalError, ValidationError } from "./errors/errors";
import {
  formatValidationErrors,
  isFastifyValidationError,
  logError,
} from "./errors/helpers";

const fastifyServer: FastifyInstance = fastify({ logger: true });

fastifyServer.setErrorHandler((error: unknown, request, reply) => {
  if (isFastifyValidationError(error)) {
    const formatted = formatValidationErrors(error.validation);

    const validationError = new ValidationError({
      message: "Validation failed",
      params: { errors: formatted },
      cause: error,
    });

    return reply
      .status(validationError.statusCode)
      .send(validationError.toPublicError());
  }

  if (!(error instanceof BaseError)) {
    logError(request, error);

    const unknownError = new InternalError({
      message: "An unknown error occurred",
      params: {},
      cause: error,
    });

    return reply
      .status(unknownError.statusCode)
      .send(unknownError.toPublicError());
  }

  logError(request, error);

  return reply.status(error.statusCode).send(error.toPublicError());
});

fastifyServer.setNotFoundHandler((_request, reply) => {
  return reply.status(404).send({
    success: false,
    statusCode: 404,
    message: "Route not found",
    params: {},
  });
});

async function start(): Promise<void> {
  try {
    await db`SELECT 1`;
    fastifyServer.log.info("Database connected successfully");
  } catch (error) {
    fastifyServer.log.error("Failed to connect to database");
    fastifyServer.log.error(error);
    process.exit(1);
  }

  await fastifyServer.register(usersRoutes);
  await fastifyServer.register(groupsRoutes);
  await fastifyServer.register(expensesRoutes);

  try {
    await fastifyServer.listen({
      host: "0.0.0.0",
      port: 3000,
    });
  } catch (error) {
    fastifyServer.log.error(error);
    process.exit(1);
  }
}

start();
