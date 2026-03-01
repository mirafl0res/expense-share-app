import type { ExpenseEntityInput } from "../repository/types";
import type { CreateExpenseRequest, Expense } from "../types";
import repository from "../repository";

export async function createExpense(
  expenseData: CreateExpenseRequest,
): Promise<Expense | null> {
  try {
    const newExpense: ExpenseEntityInput = {
      id: crypto.randomUUID(),
      group_id: expenseData.groupId,
      payer_id: expenseData.payerId,
      title: expenseData.title,
      amount: expenseData.amount,
      split_type: expenseData.splitType,
      expense_date: expenseData.expenseDate,
    };

    const result = await repository.expenses.insertExpense(newExpense);
 
  } catch (error) {}
  return null;
}
