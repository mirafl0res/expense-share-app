import type {
  ExpenseEntity,
  ExpenseCreatePayload,
  ExpenseUpdatePayload,
} from "./types/expenses";
import db from "./db";
import { DatabaseError } from "../errors";

/**
|--------------------------------------------------
*TODO[epic=repository]: getExpensesBy...
  - getExpensesByGroup
  - getExpensesByUser

|--------------------------------------------------
*/

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

export async function getExpenseById(
  id: string,
  includeDeleted: boolean = false,
): Promise<ExpenseEntity | null> {
  const [result] = await db<ExpenseEntity[]>`
  SELECT * FROM expenses
  WHERE id = ${id}
  ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
  `;

  return result ?? null;
}

export async function updateExpense(
  id: string,
  updates: ExpenseUpdatePayload,
  includeDeleted: boolean = false,
): Promise<ExpenseEntity | null> {
  const [result] = await db<ExpenseEntity[]>`
  UPDATE expenses
  SET ${db(updates)}
  WHERE id = ${id}
  ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
  RETURNING *
  `;

  return result ?? null;
}

export async function softDeleteExpense(id: string): Promise<boolean> {
  const [result] = await db<{ deleted_at: string }[]>`
  UPDATE expenses
  SET deleted_at = now()
  WHERE id = ${id} AND deleted_at IS NULL
  RETURNING deleted_at
  `;

  return !!result;
}

/**
|--------------------------------------------------
| Admin functionality
|--------------------------------------------------
*/

export async function hardDeleteExpense(id: string): Promise<boolean> {
  const [result] = await db<{ id: string }[]>`
  DELETE FROM expenses
  WHERE id = ${id}
  RETURNING id
  `;

  return !!result;
}
