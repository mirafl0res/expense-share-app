import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as controllers from "../controllers/auth";

export async function authRoutes(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
) {
  fastify.route({
    method: "GET",
    url: "/callback",
    handler: controllers.authCallbackHandler,
  });
}
