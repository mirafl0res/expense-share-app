import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as authController from "../controllers/auth";

export async function authRoutes(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
) {
  fastify.route({
    method: "GET",
    url: "/auth/callback",
    handler: authController.authCallbackHandler,
  });
}
