import { type FastifyInstance, type FastifyPluginOptions } from "fastify";
import controllers from "../controllers";

async function routes(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  fastifyServer.route({
    method: "POST",
    url: "/expenses",
    handler: controllers.expenses.createExpense,
  });
  fastifyServer.route({
    method: "GET",
    url: "/expenses/:id",
    handler: controllers.expenses.getExpenseById,
  });
  fastifyServer.route({
    method: "PATCH",
    url: "/expenses/:id",
    handler: controllers.expenses.updateExpense,
  });
  // fastifyServer.route({
  //   method: "PATCH",
  //   url: "/expenses/:id",
  //   handler: controllers.expenses.softDeleteExpense,
  // });
  fastifyServer.route({
    method: "DELETE",
    url: "/expenses/:id",
    handler: controllers.expenses.hardDeleteExpense,
  });
}

export default routes;
