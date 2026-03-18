import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as authController from "../controllers/auth0";

export async function authRoutes(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  fastifyServer.route({
    method: "GET",
    url: "/auth/authorize",
    handler: authController.redirectToAuth0Authorization,
  });

  fastifyServer.route({
    method: "GET",
    url: "/auth/callback",
    handler: authController.processAuth0AuthorizationCallback,
  });
}
