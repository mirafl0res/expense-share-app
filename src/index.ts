import { fastify, type FastifyInstance } from "fastify";
import routes from "./routes";
import db from "./repository/db";

const server: FastifyInstance = fastify({ logger: true });

async function start(): Promise<void> {
  try {
    await db`SELECT 1`;
    server.log.info("Database connected successfully");
  } catch (error) {
    server.log.error("Failed to conect to database");
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
