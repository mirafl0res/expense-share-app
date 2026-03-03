import type { ExpenseEntity, ExpenseEntityInput } from "./types";
import db from "./db";

export async function insertExpense(
  expense: ExpenseEntityInput,
): Promise<ExpenseEntity> {
  const result = await db<ExpenseEntity[]>`
  INSERT INTO expenses (
    id,
    group_id,
    payer_id,
    created_by,
    title,
    amount,
    split_type,
    expense_date
  )
  VALUES (
  ${expense.id},
  ${expense.group_id},
  ${expense.payer_id},
  ${expense.created_by},
  ${expense.title},
  ${expense.amount},
  ${expense.split_type},
  ${expense.expense_date}
  )
  RETURNING *
  `;

  if (!result[0]) {
    throw new Error("Failed to insert expense");
  }

  return result[0];

export async function updateExpense(
  expense_id: string,
  updates: ExpenseEntityInput,
): Promise<ExpenseEntity | null> {
  const [result] = await db`
  UPDATE expenses SET ${db(updates)}
  WHERE id = ${expense_id}
  RETURNING *
  `;
  return result;
}
