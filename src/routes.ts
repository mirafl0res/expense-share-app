import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as controllers from "./controllers";

async function routes(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  fastifyServer.route({
    method: "POST",
    url: "/expenses",
    handler: controllers.createExpense,
  });
}

export default routes;
