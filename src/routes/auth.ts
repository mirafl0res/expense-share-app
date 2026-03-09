import { type FastifyInstance, type FastifyPluginOptions } from "fastify";

export async function authRoutes(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  fastify.route({
    method: "POST",
    url: "/auth/register",
    handler: async (request, reply) => {
      const { email, user_id } = request.body as { email: string; user_id: string };
      const secret = request.headers["x-auth0-secret"];
      if (secret !== Bun.env.AUTH0_ACTION_SECRET) {
        return reply.code(401).send({ error: "Unauthorized" });
      }
      // TODO: Validate input, insert user into DB
      return reply.send({ success: true });
    },
  });
}
