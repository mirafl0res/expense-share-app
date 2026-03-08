import type { ExpenseEntity, ExpenseEntityPayload } from "./types/expenses";
import db from "./db";
import { DatabaseError } from "../errors/errors";

export async function insertExpense(expense: ExpenseEntityPayload): Promise<ExpenseEntity> {
  try {
    const [result] = await db<ExpenseEntity[]>`
    INSERT INTO expenses ${db(expense)}
    RETURNING *
    `;

    if (!result) {
      throw new DatabaseError({ message: "insertExpense: No row returned" });
    }

    return result;
  } catch (error) {
    throw new DatabaseError({
      message: "Insert expense: database error",
      cause: error,
    });
  }
}

export async function getExpenseById(
  id: string,
  includeDeleted: boolean = false,
): Promise<ExpenseEntity | null> {
  try {
    const [result] = await db<ExpenseEntity[]>`
    SELECT * FROM expenses
    WHERE id = ${id}
  ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
  `;

    return result ?? null;
  } catch (error) {
    throw new DatabaseError({
      message: "getExpenseById: Database error",
      cause: error,
    });
  }
}

export async function updateExpense(
  id: string,
  updates: Partial<ExpenseEntityPayload>,
  includeDeleted: boolean = false,
): Promise<ExpenseEntity | null> {
  try {
    const [result] = await db<ExpenseEntity[]>`
    UPDATE expenses
    SET ${db(updates)}
    WHERE id = ${id}
    ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
    RETURNING *
  `;

    return result ?? null;
  } catch (error) {
    throw new DatabaseError({
      message: "insertExpense: Database error",
      cause: error,
    });
  }
}

export async function softDeleteExpense(id: string): Promise<boolean> {
  try {
    const [result] = await db<{ deleted_at: string }[]>`
    UPDATE expenses
    SET deleted_at = now()
    WHERE id = ${id} AND deleted_at IS NULL
    RETURNING deleted_at
  `;

    return !!result;
  } catch (error) {
    throw new DatabaseError({
      message: "softDeleteExpense: Database error",
      cause: error,
    });
  }
}

export async function hardDeleteExpense(id: string): Promise<boolean> {
  try {
    const [result] = await db<{ id: string }[]>`
    DELETE FROM expenses
    WHERE id = ${id}
    RETURNING id
    `;

    return !!result;
  } catch (error) {
    throw new DatabaseError({
      message: "hardDeleteExpense: Database error",
      cause: error,
    });
  }
}
