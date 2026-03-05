import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  ExpenseCreateRequest,
  ExpenseUpdateRequest,
} from "../types/expenses";
import { services } from "../services";
import { NotFoundError } from "../errors";

export async function createExpense(
  request: FastifyRequest<{ Body: ExpenseCreateRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const expense = await services.expenses.createExpense(request.body);
  reply.status(201).send(expense);
}

export async function getExpenseById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const expense = await services.expenses.getExpenseById(request.params.id);
  if (!expense) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  reply.status(200).send(expense);
}

export async function updateExpense(
  request: FastifyRequest<{
    Params: { id: string };
    Body: ExpenseUpdateRequest;
  }>,
  reply: FastifyReply,
): Promise<void> {
  const updatedExpense = await services.expenses.updateExpense(
    request.params.id,
    request.body,
  );
  if (!updatedExpense) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  reply.status(200).send(updatedExpense);
}

export async function deleteExpense(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await services.expenses.softDeleteExpense(request.params.id);
  reply.status(204).send(deleted);
}
