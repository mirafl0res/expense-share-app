import { type FastifyInstance, type FastifyPluginOptions } from "fastify";
import * as schemas from "../schemas/expenses";
import * as expenseController from "../controllers/expenses";
import { sanitizeExpenseRequest } from "../hooks/sanitizers";

export async function expenseRoutes(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  fastifyServer.route({
    method: "POST",
    url: "/expenses",
    schema: schemas.createExpenseSchema,
    preValidation: sanitizeExpenseRequest,
    preHandler: fastifyServer.requireAuth,
    handler: expenseController.createExpense,
  });

  fastifyServer.route({
    method: "GET",
    url: "/expenses/:id",
    schema: schemas.getExpenseByIdSchema,
    preHandler: fastifyServer.requireAuth,
    handler: expenseController.getExpenseById,
  });

  fastifyServer.route({
    method: "PATCH",
    url: "/expenses/:id",
    schema: schemas.updateExpenseSchema,
    preValidation: sanitizeExpenseRequest,
    preHandler: fastifyServer.requireAuth,
    handler: expenseController.updateExpense,
  });

  fastifyServer.route({
    method: "DELETE",
    url: "/expenses/:id",
    schema: schemas.deleteExpenseSchema,
    preHandler: fastifyServer.requireAuth,
    handler: expenseController.deleteExpense,
  });
  
  // fastifyServer.route({
  //   method: "PATCH",
  //   url: "/expenses/:id/",
  //   schema: schemas.softDeleteExpenseSchema,
  //   handler: expenseController.softDeleteExpense,
  // });
}
