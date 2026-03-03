import type { ExpenseCreateRequest, Expense } from "../types/types";
import repository from "../repository";
import { ExpenseMapper } from "../mappers";
import { DatabaseError } from "../errors";

export async function createExpense(
  expenseData: ExpenseCreateRequest,
): Promise<Expense> {
  const testUserId = "11111111-1111-1111-1111-111111111111";
  try {
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
  } catch (error) {
    throw new DatabaseError("Failed to create expense", error as Error);
  }
}
