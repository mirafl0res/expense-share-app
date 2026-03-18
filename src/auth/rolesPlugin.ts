import fastifyPlugin from "fastify-plugin";
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

async function rolesPlugin(fastify: FastifyInstance) {
  fastify.decorate(
    "requireAdmin",
    async function (request: FastifyRequest, reply: FastifyReply) {
      const roles = request.user["https://expense-share-app.com/roles"];
      if (!roles || roles.includes("admin")) {
        return reply
          .status(403)
          .send({ error: "Forbidden: admin access required" });
      }
    },
  );
}

export default fastifyPlugin(rolesPlugin);
