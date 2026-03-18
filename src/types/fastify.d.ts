import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    requireAdmin: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
