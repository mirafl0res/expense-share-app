import type { ExpenseEntityInput } from "../repository/types";
import type { CreateExpenseRequest, Expense } from "../types";
import repository from "../repository";
import { ExpenseMapper } from "../mappers";

export async function createExpense(
  expenseData: CreateExpenseRequest,
): Promise<Expense> {
  const testUserId = "11111111-1111-1111-1111-111111111111";
  try {
    const newExpense: ExpenseEntityInput = {
      id: crypto.randomUUID(),
      created_by: testUserId, // TODO[epic=authentication]: Implement JWT verification
      group_id: expenseData.groupId,
      payer_id: expenseData.payerId,
      title: expenseData.title,
      amount: expenseData.amount,
      split_type: expenseData.splitType,
      expense_date: expenseData.expenseDate,
    };

    const result = await repository.expenses.insertExpense(newExpense);
    return ExpenseMapper.toDomain(result);
  } catch (error) {
    console.error("Failed to create expense:", error);
    throw new Error("Failed to create expense");
  }
}
