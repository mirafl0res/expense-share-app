import type { FastifyReply, FastifyRequest } from "fastify";
import type { ExpenseCreateRequest } from "./types/expenses";
import { services } from "./services";

export async function createExpense(
  request: FastifyRequest<{ Body: ExpenseCreateRequest; Params: {} }>,
  reply: FastifyReply,
): Promise<void> {
  const expense = await services.expenses.createExpense(request.body);
  reply.status(201).send(expense);
}
