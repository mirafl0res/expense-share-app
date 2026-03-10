import fastifyJwt from "@fastify/jwt";
import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import {
  AuthenticationError,
  ForbiddenError,
  InternalError,
} from "./errors/errors";

declare module "fastify" {
  interface FastifyInstance {
    requireAuth(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    requireAdmin(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

function isNonEmptyString(input: unknown): input is string {
  return typeof input === "string" && input.trim() !== "";
}

async function authPlugin(
  fastifyServer: FastifyInstance,
  options: FastifyPluginOptions,
) {
  await fastifyServer.register(fastifyJwt, {
    secret: "", // getPublicKey, *TODO[epic=auth]: implement jwks.ts file
    decode: { complete: true },
  });

  fastifyServer.decorate(
    "requireAuth",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
        console.log("Decoded JWT payload:", request.user); //FIXME - Remove before production

        const user = request.user as Record<string, unknown>;
        const auth0Sub = user["sub"];
        if (!isNonEmptyString(auth0Sub)) {
          throw new AuthenticationError({ message: "Missing user ID" });
        }
      } catch (error) {
        request.log.error(error, "JWT verification failed");
        throw new AuthenticationError({ message: "Authentication failed" });
      }
    },
  );

  fastifyServer.decorate(
    "requireAdmin",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const auth0RoleClaim = Bun.env.AUTH0_ROLES_CLAIM;
        if (!auth0RoleClaim) {
          throw new InternalError({ message: "AUTH0_ROLES_CLAIM is not set" });
        }
        await request.jwtVerify();

        const user = request.user as Record<string, unknown>;
        const auth0Sub = user["sub"];
        if (!isNonEmptyString(auth0Sub)) {
          throw new AuthenticationError({ message: "Missing user ID" });
        }

        const roles = Array.isArray(user[auth0RoleClaim])
          ? user[auth0RoleClaim]
          : [];

        const isAdmin = roles.includes("admin");

        if (!isAdmin) {
          throw new ForbiddenError({
            message: "Forbidden: admin access required",
          });
        }
      } catch (error) {
        request.log.error(error, "Admin JWT verification failed");

        if (error instanceof ForbiddenError) {
          throw error;
        }
        throw new AuthenticationError({ message: "Authentication failed" });
      }
    },
  );
}
