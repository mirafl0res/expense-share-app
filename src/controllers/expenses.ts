import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  ExpenseCreateRequest,
  ExpenseUpdateRequest,
} from "../types/expenses";
import * as services from "../services/expenses";

export async function createExpense(
  request: FastifyRequest<{ Body: ExpenseCreateRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const newExpense = await services.createExpense(request.body);
  reply.status(201).send(newExpense);
}

export async function getExpenseById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const expense = await services.getExpenseById(request.params.id);
  reply.status(200).send(expense);
}

export async function updateExpense(
  request: FastifyRequest<{
    Params: { id: string };
    Body: ExpenseUpdateRequest;
  }>,
  reply: FastifyReply,
): Promise<void> {
  const updatedExpense = await services.updateExpense(
    request.params.id,
    request.body,
  );
  reply.status(200).send(updatedExpense);
}

export async function deleteExpense(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await services.hardDeleteExpense(request.params.id);
  reply.status(204).send(deleted);
}

export async function softDeleteExpense(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await services.softDeleteExpense(request.params.id);
  reply.status(204).send(deleted);
}
