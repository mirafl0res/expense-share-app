import type {
  ExpenseEntity,
  ExpenseEntityPayload,
  ExpenseParticipantEntity,
  ExpenseParticipantEntityPayload,
} from "./types/expenses";
import db from "./db";
import { DatabaseError } from "../errors/errors";

export async function insertExpense(
  expense: ExpenseEntityPayload,
): Promise<ExpenseEntity> {
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

/**
|--------------------------------------------------
| Join table: expense_participants
|--------------------------------------------------
*/

export async function insertExpenseParticipant(
  participant: ExpenseParticipantEntityPayload,
): Promise<ExpenseParticipantEntity> {
  try {
    const [result] = await db<ExpenseParticipantEntity[]>`
    INSERT INTO expense_participants ${db(participant)}
    RETURNING *
    `;

    if (!result) {
      throw new DatabaseError({
        message: "insertExpenseParticipant: No row returned",
      });
    }

    return result;
  } catch (error) {
    throw new DatabaseError({
      message: "Insert expense participant: database error",
      cause: error,
    });
  }
}

export async function hardDeleteExpenseParticipant(
  user_id: string,
  expense_id: string,
): Promise<boolean> {
  try {
    const [result] = await db<{ user_id: string; group_id: string }[]>`
    DELETE FROM expense_participants
    WHERE user_id = ${user_id} AND expense_id = ${expense_id}
    RETURNING user_id, expense_id
    `;

    return !!result;
  } catch (error) {
    throw new DatabaseError({
      message: "hardDeleteExpenseParticipant: Database error",
      cause: error,
    });
  }
}
