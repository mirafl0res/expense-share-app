import { fastify, type FastifyInstance } from "fastify";
import routes from "./routes";
import db from "./repository/db";
import { BaseError, InternalError } from "./errors";

const server: FastifyInstance = fastify({ logger: true });

server.setErrorHandler((error: unknown, request, reply) => {
  if (!(error instanceof BaseError)) {
    request.log.error((error as any)?.cause ?? error);

    const unknownError = new InternalError({
      message: "Unknown error",
      cause: error,
    });

    return reply
      .status(unknownError.statusCode)
      .send(unknownError.toPublicError());
  }

  request.log.error(error.cause ?? error);

  return reply.status(error.statusCode).send(error.toPublicError());
});

server.setNotFoundHandler((request, reply) => {
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
    server.log.info("Database connected successfully");
  } catch (error) {
    server.log.error("Failed to connect to database");
    server.log.error(error);
    process.exit(1);
  }

  await server.register(routes);

  try {
    await server.listen({
      host: "0.0.0.0",
      port: 3000,
    });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

start();
