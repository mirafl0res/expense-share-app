import type { FastifyReply, FastifyRequest } from "fastify";
import type { ExpenseCreateRequest } from "./types";
import { services } from "./services";

export async function createExpense(
  request: FastifyRequest<{ Body: ExpenseCreateRequest; Params: {} }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    const expense = await services.expenses.createExpense(request.body);
    reply.status(201).send(expense);
  } catch (error) {
    reply.status(500).send({ error: "Internal server error" });
  }
}
