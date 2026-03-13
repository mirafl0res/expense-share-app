import type {
  Expense,
  ExpenseCreateRequest,
  ExpenseParticipantRequest,
} from "../types/expenses";
import * as expenseRepository from "../repository/expenses";
import { ExpenseMapper } from "../mappers/expenses";
import { NotFoundError } from "../errors/errors";

export async function createExpense(
  data: ExpenseCreateRequest & ExpenseParticipantRequest[],
  userId: string,
): Promise<Expense | null> {
  const newExpense: Expense = {
    id: crypto.randomUUID(),
    createdBy: userId,
    expenseGroupId: data.expenseGroupId,
    payerId: data.payerId ?? userId,
    title: data.title,
    amount: data.amount,
    splitType: data.splitType,
    expenseDate: data.expenseDate ?? new Date().toISOString().slice(0, 10),
    description: data.description,
  };

  const expenseEntityPayload = ExpenseMapper.toEntityPayload(newExpense);

  return null;
}

export async function getExpenseById(id: string): Promise<Expense> {
  const result = await expenseRepository.getExpenseById(id);

  if (!result) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  return ExpenseMapper.toDomain(result);
}

export async function updateExpense(
  id: string,
  data: Partial<ExpenseCreateRequest>,
): Promise<Expense | null> {
  const updates = ExpenseMapper.toPartialEntityPayload(data);

  const result = await expenseRepository.updateExpense(id, updates);

  if (!result) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  return ExpenseMapper.toDomain(result);
}

export async function softDeleteExpense(id: string): Promise<boolean> {
  const deleted = await expenseRepository.softDeleteExpense(id);

  if (!deleted) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  return deleted;
}

export async function hardDeleteExpense(id: string): Promise<boolean> {
  const deleted = await expenseRepository.hardDeleteExpense(id);

  if (!deleted) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  return deleted;
}
