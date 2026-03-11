import type {
  ExpenseCreateRequest,
  Expense,
  ExpenseUpdateRequest,
} from "../types/expenses";
import * as repository from "../repository/expenses";
import { ExpenseMapper } from "../mappers/expenses";
import { NotFoundError } from "../errors/errors";

export async function createExpense(
  data: ExpenseCreateRequest,
  userId: string,
): Promise<Expense> {
  const newExpense: Expense = {
    id: crypto.randomUUID(),
    createdBy: userId,
    groupId: data.groupId,
    payerId: data.payerId ?? userId,
    title: data.title,
    amount: data.amount,
    splitType: data.splitType,
    expenseDate: data.expenseDate ?? new Date().toISOString().slice(0, 10),
    description: data.description,
  };

  const result = await repository.insertExpense(
    ExpenseMapper.toEntity(newExpense),
  );

  return ExpenseMapper.toDomain(result);
}

export async function getExpenseById(id: string): Promise<Expense> {
  const result = await repository.getExpenseById(id);
  if (!result) {
    throw new NotFoundError({ message: "Expense not found" });
  }
  return ExpenseMapper.toDomain(result);
}

export async function updateExpense(
  id: string,
  data: ExpenseUpdateRequest,
): Promise<Expense | null> {
  const updates = ExpenseMapper.toPartialEntity(data);

  const result = await repository.updateExpense(id, updates);
  if (!result) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  return ExpenseMapper.toDomain(result);
}

export async function softDeleteExpense(id: string): Promise<boolean> {
  const deleted = await repository.softDeleteExpense(id);
  if (!deleted) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  return deleted;
}

export async function hardDeleteExpense(id: string): Promise<boolean> {
  const deleted = await repository.hardDeleteExpense(id);
  if (!deleted) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  return deleted;
}
