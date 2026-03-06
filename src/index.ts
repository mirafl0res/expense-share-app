import { fastify, type FastifyInstance } from "fastify";
import routes from "./routes";
import db from "./repository/db";
import { BaseError, InternalError } from "./errors";

const fastifyServer: FastifyInstance = fastify({ logger: true });

fastifyServer.setErrorHandler((error: unknown, request, reply) => {
  if (!(error instanceof BaseError)) {
    request.log.error((error as any)?.cause ?? error);

    const unknownError = new InternalError({
      message: "An unknown error occurred",
      cause: error,
    });

    return reply
      .status(unknownError.statusCode)
      .send(unknownError.toPublicError());
  }

  request.log.error(error.cause ?? error);

  return reply.status(error.statusCode).send(error.toPublicError());
});

fastifyServer.setNotFoundHandler((request, reply) => {
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

  for (const route of routes) {
    await fastifyServer.register(route);
  }

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
