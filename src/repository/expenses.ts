import type { ExpenseEntity, ExpenseCreatePayload } from "./types/expenses";
import db from "./db";
import { DatabaseError } from "../errors";

export async function insertExpense(
  expense: ExpenseCreatePayload,
): Promise<ExpenseEntity> {
  const [result] = await db<ExpenseEntity[]>`
  INSERT INTO expenses ${db(expense)}
  RETURNING *
  `;

  if (!result) {
    throw new DatabaseError({ message: "Failed to insert expense" });
  }

  return result;
}

export async function updateExpense(
  expense_id: string,
  updates: ExpenseCreatePayload,
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
