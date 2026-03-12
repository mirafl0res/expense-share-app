import { fastify, type FastifyInstance } from "fastify";
import { expenseRoutes, userRoutes, groupRoutes, authRoutes } from "./routes";

import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
// import authPlugin from "./auth/auth";
import db from "./repository/db";
import { BaseError, InternalError, ValidationError } from "./errors/errors";
import {
  formatValidationErrors,
  isFastifyValidationError,
  logBaseError,
  logUnknownError,
  logValidationError,
} from "./errors/helpers";
import fastifyAuth0Api from "@auth0/auth0-fastify-api";

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

/**
|--------------------------------------------------
| AUTH0/FASTIFY API
|--------------------------------------------------
*/
const domain = Bun.env.AUTH0_DOMAIN;
const audience = Bun.env.AUTH0_AUDIENCE;

if (!domain || !audience) {
  throw new Error(
    "Missing AUTH0_DOMAIN or AUTH0_AUDIENCE in environment variables",
  );
}
await fastifyServer.register(fastifyAuth0Api, {
  domain,
  audience,
});

// Public route - no authentication required
fastifyServer.get("/api/public", async (request, reply) => {
  return {
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
    timestamp: new Date().toISOString(),
  };
});

// Protected route - requires valid access token
fastifyServer.get(
  "/api/private",
  {
    preHandler: fastifyServer.requireAuth(),
  },
  async (request, reply) => {
    return {
      message:
        "Hello from a protected endpoint! You successfully authenticated.",
      user: request.user.sub,
      timestamp: new Date().toISOString(),
    };
  },
);

// Protected route - returns user information from token
fastifyServer.get(
  "/api/profile",
  {
    preHandler: fastifyServer.requireAuth(),
  },
  async (request, reply) => {
    return {
      message: "Your user profile from the access token",
      profile: request.user,
    };
  },
);

/**
|--------------------------------------------------
| END
|--------------------------------------------------
*/

async function start(): Promise<void> {
  try {
    await db`SELECT 1`;
    fastifyServer.log.info("Database connected successfully");
  } catch (error) {
    fastifyServer.log.error("Failed to connect to database");
    fastifyServer.log.error(error);
    process.exit(1);
  }
  // curl http://localhost:3000/api/public
  // curl http://localhost:3000/api/private

  const clientOrigin = Bun.env.CLIENT_ORIGIN;

  await fastifyServer.register(fastifyCors, {
    origin: clientOrigin,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  });

  await fastifyServer.register(fastifyHelmet);
  // await fastifyServer.register(authPlugin);
  // await fastifyServer.register(authRoutes);
  // await fastifyServer.register(userRoutes);
  // await fastifyServer.register(groupRoutes);
  // await fastifyServer.register(expenseRoutes);
  await fastifyServer.register(expenseRoutes);

  try {
    await fastifyServer.listen({
      host: "0.0.0.0",
      port: 3000,
    });
  } catch (error) {
    fastifyServer.log.error(error);
    process.exit(1);
  }
  fastifyServer.log.info("API server running at http://localhost:3000");
}

start();
