import { type FastifyInstance, type FastifyPluginOptions } from "fastify";
import * as schemas from "../schemas/expenses";
import * as controllers from "../controllers/expenses";
import { sanitizeExpenseRequest } from "../hooks/sanitizers";

export async function expensesRoutes(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  fastifyServer.route({
    method: "POST",
    url: "/expenses",
    schema: schemas.createExpenseSchema,
    preValidation: sanitizeExpenseRequest,
    // preHandler: fastifyServer.requireAuth,
    preHandler: fastifyServer.requireAdmin,
    handler: controllers.createExpense,
  });
  fastifyServer.route({
    method: "GET",
    url: "/expenses/:id",
    schema: schemas.getExpenseByIdSchema,
    preHandler: fastifyServer.requireAuth,
    handler: controllers.getExpenseById,
  });
  fastifyServer.route({
    method: "PATCH",
    url: "/expenses/:id",
    schema: schemas.updateExpenseSchema,
    preValidation: sanitizeExpenseRequest,
    handler: controllers.updateExpense,
  });
  fastifyServer.route({
    method: "DELETE",
    url: "/expenses/:id",
    schema: schemas.deleteExpenseSchema,
    handler: controllers.deleteExpense,
  });
  // fastifyServer.route({
  //   method: "PATCH",
  //   url: "/expenses/:id/",
  //   schema: schemas.softDeleteExpenseSchema,
  //   handler: controllers.softDeleteExpense,
  // });
}
