import type { ExpenseCreateRequest, Expense } from "../types/expenses";
import repository from "../repository";
import { ExpenseMapper } from "../mappers";
import { DatabaseError, NotFoundError } from "../errors";

export async function createExpense(
  expenseData: ExpenseCreateRequest,
): Promise<Expense> {
  const testUserId = "11111111-1111-1111-1111-111111111111";
  const newExpense: Expense = {
    id: crypto.randomUUID(),
    createdBy: testUserId, // TODO[epic=authentication]: Implement JWT verification
    groupId: expenseData.groupId,
    payerId: expenseData.payerId,
    title: expenseData.title,
    amount: expenseData.amount,
    splitType: expenseData.splitType,
    expenseDate: expenseData.expenseDate,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
  };

  const result = await repository.expenses.insertExpense(
    ExpenseMapper.toEntity(newExpense),
  );

  return ExpenseMapper.toDomain(result);
}

export async function getExpenseById(id: string): Promise<Expense> {
  const result = await repository.expenses.getExpenseById(id);
  if (!result) {
    throw new NotFoundError({ message: "Expense not found" });
  }
  return ExpenseMapper.toDomain(result);
}
