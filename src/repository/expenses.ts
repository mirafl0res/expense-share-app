import type { ExpenseEntity } from "./types";
import db from "./db";

export async function insertExpense(
  expense: ExpenseEntity,
): Promise<ExpenseEntity | null> {
  const result = await db`
    
    
    `;
  return result[0] ?? null;
}
