import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  ExpenseCreateRequest,
  ExpenseWithParticipantsRequest,
} from "../types/expenses";
import * as expenseService from "../services/expenses";
import * as authService from "../services/auth/auth0";

export async function createExpense(
  request: FastifyRequest<{
    Body: ExpenseWithParticipantsRequest;
  }>,
  reply: FastifyReply,
): Promise<void> {
  const user = await authService.getAuthenticatedUserFromRequest(request);
  const newExpense = await expenseService.createExpense(request.body, user.id);

  reply.status(201).send(newExpense);
}

export async function getExpenseById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const expense = await expenseService.getExpenseById(request.params.id);

  reply.status(200).send(expense);
}

export async function updateExpense(
  request: FastifyRequest<{
    Params: { id: string };
    Body: Partial<ExpenseCreateRequest>;
  }>,
  reply: FastifyReply,
): Promise<void> {
  const updatedExpense = await expenseService.updateExpense(
    request.params.id,
    request.body,
  );

  reply.status(200).send(updatedExpense);
}

export async function deleteExpense(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await expenseService.hardDeleteExpense(request.params.id);

  reply.status(204).send(deleted);
}

export async function softDeleteExpense(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await expenseService.softDeleteExpense(request.params.id);

  reply.status(204).send(deleted);
}
