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
} from "../errors/errors";
import { extractAndValidatePayload } from "./helpers";
import fastifyPlugin from "fastify-plugin";

declare module "fastify" {
  interface FastifyRequest {
    jwtTokenPayload?: Record<string, unknown>;
  }
  interface FastifyInstance {
    requireAuth(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    requireAdmin(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

async function authPlugin(
  fastifyServer: FastifyInstance,
  options: FastifyPluginOptions,
): Promise<void> {
  fastifyServer.decorate(
    "requireAuth",
    async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      try {
        const payload = await extractAndValidatePayload(request);
        request.jwtTokenPayload = payload;
        console.log("Decoded JWT payload (requireAdmin):", request.jwtTokenPayload); //FIXME - Remove before production
      } catch (error) {
        request.log.error(error, "JWT verification failed");
        throw new AuthenticationError({
          message: "Authentication failed",
          cause: error,
        });
      }
    },
  );

  fastifyServer.decorate(
    "requireAdmin",
    async (request: FastifyRequest<{}>, reply: FastifyReply): Promise<void> => {
      try {
        const auth0RolesClaim = Bun.env.AUTH0_ROLES_CLAIM;
        console.log("AUTH0_ROLES_CLAIM:", Bun.env.AUTH0_ROLES_CLAIM);
        if (!auth0RolesClaim) {
          throw new InternalError({ message: "No AUTH0_ROLES_CLAIM provided" });
        }
        const payload = await extractAndValidatePayload(request);
        request.jwtTokenPayload = payload;

        const roles = Array.isArray(payload[auth0RolesClaim])
          ? payload[auth0RolesClaim]
          : [];

        console.log("ROLES:", roles);
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

export default fastifyPlugin(authPlugin);
