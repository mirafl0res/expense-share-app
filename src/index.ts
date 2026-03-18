import { fastify, type FastifyInstance } from "fastify";
import fastifyAuth0Api from "@auth0/auth0-fastify-api";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import { expenseRoutes, userRoutes, groupRoutes, authRoutes } from "./routes";
import rolesPlugin from "./auth/rolesPlugin";
import db from "./repository/db";
import { BaseError, InternalError, ValidationError } from "./errors/errors";
import {
  formatValidationErrors,
  isFastifyValidationError,
  logBaseError,
  logUnknownError,
  logValidationError,
} from "./errors/helpers";

const fastifyServer: FastifyInstance = fastify({ logger: true });

fastifyServer.setErrorHandler((error: unknown, request, reply) => {
  if (isFastifyValidationError(error)) {
    const formatted = formatValidationErrors(error.validation);
    logValidationError(request, formatted, error);
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
    logUnknownError(request, error);
    const unknownError = new InternalError({
      message: "An unknown error occurred",
      params: {},
      cause: error,
    });
    return reply
      .status(unknownError.statusCode)
      .send(unknownError.toPublicError());
  }

  logBaseError(request, error);
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

// Auth0/Fastify API config
const domain = Bun.env.AUTH0_DOMAIN;
const audience = Bun.env.AUTH0_AUDIENCE;
if (!domain || !audience) {
  throw new InternalError({
    message: "Missing AUTH0_DOMAIN or AUTH0_AUDIENCE in environment variables",
  });
}
await fastifyServer.register(fastifyAuth0Api, { domain, audience });

await fastifyServer.register(rolesPlugin);
await fastifyServer.register(authRoutes);
await fastifyServer.register(userRoutes);
await fastifyServer.register(groupRoutes);
await fastifyServer.register(expenseRoutes);

async function start(): Promise<void> {
  try {
    await db`SELECT 1`;
    fastifyServer.log.info("Database connected successfully");
  } catch (error) {
    fastifyServer.log.error("Failed to connect to database");
    fastifyServer.log.error(error);
    process.exit(1);
  }

  const clientOrigin = Bun.env.CLIENT_ORIGIN;
  await fastifyServer.register(fastifyCors, {
    origin: clientOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  });
  await fastifyServer.register(fastifyHelmet);

  try {
    await fastifyServer.listen({
      host: "0.0.0.0",
      port: 3000,
    });
  } catch (error) {
    fastifyServer.log.error(error);
    process.exit(1);
  }
  fastifyServer.log.info(`API server running at ${clientOrigin}`);
}

start();
