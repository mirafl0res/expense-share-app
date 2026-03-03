import { fastify, type FastifyInstance } from "fastify";
import routes from "./routes";
import db from "./repository/db";

const server: FastifyInstance = fastify({ logger: true });

async function start(): Promise<void> {
  try {
    await db`SELECT 1`;
    server.log.info("Database connected successfully");
  } catch (error) {
    server.log.error("Failed to connect to database");
    server.log.error(error);
    process.exit(1);
  }

  server.setErrorHandler((error: unknown, request, reply) => {
    if (!(error instanceof Error)) {
      request.log.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }

    const statusCode = (error as any).statusCode ?? 500;

    if (statusCode >= 500) {
      request.log.error(error);
      return reply.status(statusCode).send({ error: "Internal server error" });
    }

    return reply.status(statusCode).send({ error: error.message });
  });

  server.setNotFoundHandler((request, reply) => {
    return reply.status(404).send({ error: "Route not found" });
  });

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
