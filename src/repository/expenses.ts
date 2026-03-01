import type { ExpenseEntity, NewExpenseInput } from "./types";
import db from "./db";

export async function insertExpense(
  expense: NewExpenseInput,
): Promise<ExpenseEntity> {
  const result = await db<ExpenseEntity[]>`
  INSERT INTO expenses (
    id,
    group_id,
    payer_id,
    title,
    amount,
    split_type,
    expense_date,
  )
  VALUES (
  ${expense.id},
  ${expense.group_id},
  ${expense.payer_id},
  ${expense.title},
  ${expense.amount},
  ${expense.split_type},
  ${expense.expense_date},
  )
  RETURNING *
  `;

  if (!result[0]) {
    throw new Error("Failed to insert expense");
  }

  return result[0];
}
