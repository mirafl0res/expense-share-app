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
import type { Auth0AccessTokenPayload } from "./types/auth0";

declare module "fastify" {
  interface FastifyInstance {
    requireAuth(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    requireAdmin(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
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
        await request.jwtVerify<Auth0AccessTokenPayload>();
        console.log("Decoded JWT payload:", request.user); //FIXME - Remove before production
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
        await request.jwtVerify<Auth0AccessTokenPayload>();
        const user = request.user as Record<string, unknown>;
        const roles = user[auth0RoleClaim];
        const isAdmin = Array.isArray(roles) && roles.includes("admin");

        if (!isAdmin) {
          throw new ForbiddenError({
            message: "Forbidden: admin access required",
          });
        }
      } catch (error) {}
    },
  );
}
