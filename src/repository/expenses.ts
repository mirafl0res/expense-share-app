import type { ExpenseEntity, ExpenseEntityInput } from "./types";
import db from "./db";

export async function insertExpense(
  expense: ExpenseEntityInput,
): Promise<ExpenseEntity> {
  const [result] = await db<ExpenseEntity[]>`
  INSERT INTO expenses ${db(expense)}
  RETURNING *
  `;

  if (!result) {
    throw new Error("Failed to insert expense");
  }

  return result;
}

export async function updateExpense(
  expense_id: string,
  updates: ExpenseEntityInput,
  includeDeleted: boolean = false,
): Promise<ExpenseEntity | null> {
  const [result] = await db`
  UPDATE expenses SET ${db(updates)}
  WHERE id = ${expense_id}
  ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
  RETURNING *
  `;

  return result ?? null;
}

export async function getExpenseById(
  expense_id: string,
  includeDeleted: boolean = false,
): Promise<ExpenseEntity | null> {
  const [result] = await db`
  SELECT * FROM expenses
  WHERE id = ${expense_id}
  ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
  `;

  return result ?? null;
}
