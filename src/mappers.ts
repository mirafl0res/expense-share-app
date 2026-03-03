import type { ExpenseEntity } from "./repository/types/expenses";
import type { Expense } from "./types/expenses";

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
  toEntity(domain: Expense): ExpenseEntity {
    return {
      id: domain.id,
      group_id: domain.groupId,
      created_by: domain.createdBy,
      payer_id: domain.payerId,
      title: domain.title,
      amount: domain.amount,
      split_type: domain.splitType,
      expense_date: domain.expenseDate,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
      deleted_at: domain.deletedAt,
    };
  },
};
