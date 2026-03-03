import type { ExpenseEntity } from "./repository/types";
import type { Expense } from "./types";

export const ExpenseMapper = {
  toDomain(entity: ExpenseEntity): Expense {
    return {
      id: entity.id,
      createdBy: entity.created_by,
      groupId: entity.group_id,
      payerId: entity.payer_id,
      title: entity.title,
      amount: entity.amount,
      splitType: entity.split_type,
      expenseDate: entity.expense_date,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      deletedAt: entity.deleted_at,
    };
  },
};
