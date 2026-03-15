import type {
  ExpenseEntity,
  ExpenseEntityPayload,
  ParticipantEntity,
  ParticipantEntityPayload,
} from "./types/expenses";
import db from "./db";
import { DatabaseError } from "../errors/errors";
import { mapPostgresError } from "../errors/helpers";

export async function insertExpenseWithParticipants(
  expense: ExpenseEntityPayload,
  participants: ParticipantEntityPayload[],
): Promise<ExpenseEntity> {
  try {
    const result = await db.begin(async (tx): Promise<ExpenseEntity> => {
      const [insertedExpense] = await tx`
      INSERT INTO expenses ${tx(expense)}
      RETURNING *
      `;

      await tx`
      INSERT INTO expense_participants ${tx(participants)}
      `;

      return insertedExpense;
    });

    if (!result) {
      throw new DatabaseError({
        message: "insertExpenseWithParticipants: no row returned",
      });
    }

    return result;
  } catch (error) {
    throw mapPostgresError(error);
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
    throw mapPostgresError(error);
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
    throw mapPostgresError(error);
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
    throw mapPostgresError(error);
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
    throw mapPostgresError(error);
  }
}

/**
|--------------------------------------------------
| Join table: expense_participants
|--------------------------------------------------
*/

export async function insertParticipant(
  participant: ParticipantEntityPayload,
): Promise<ParticipantEntity> {
  try {
    const [result] = await db<ParticipantEntity[]>`
    INSERT INTO expense_participants ${db(participant)}
    RETURNING *
    `;

    if (!result) {
      throw new DatabaseError({
        message: "insertParticipant: No row returned",
      });
    }

    return result;
  } catch (error) {
    throw mapPostgresError(error);
  }
}

export async function hardDeleteParticipant(
  userId: string,
  expenseId: string,
): Promise<boolean> {
  try {
    const [result] = await db<{ user_id: string; expense_id: string }[]>`
    DELETE FROM expense_participants
    WHERE user_id = ${userId} AND expense_id = ${expenseId}
    RETURNING user_id, expense_id
    `;

    return !!result;
  } catch (error) {
    throw mapPostgresError(error);
  }
}
