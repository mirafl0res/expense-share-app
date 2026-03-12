import type { ExpenseEntity, ExpenseEntityPayload } from "../repository/types/expenses";
import type { Expense, ExpenseUpdateRequest } from "../types/expenses";

export const ExpenseMapper = {
  toDomain(entity: ExpenseEntity): Expense {
    return {
      id: entity.id,
      createdBy: entity.created_by,
      groupId: entity.expense_group_id,
      payerId: entity.payer_id,
      title: entity.title,
      description: entity.description ?? undefined,
      amount: entity.amount,
      splitType: entity.split_type,
      expenseDate: entity.expense_date,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at ?? undefined,
      deletedAt: entity.deleted_at ?? undefined,
    };
  },
  toEntity(expense: Expense): ExpenseEntityPayload {
    return {
      id: expense.id,
      expense_group_id: expense.groupId,
      created_by: expense.createdBy,
      payer_id: expense.payerId,
      title: expense.title,
      description: expense.description ?? null,
      amount: expense.amount,
      split_type: expense.splitType,
      expense_date: expense.expenseDate,
    };
  },
  toPartialEntity(updates: ExpenseUpdateRequest): Partial<ExpenseEntityPayload> {
    const { payerId, title, amount, splitType, expenseDate, description } = updates;
    const payload: Partial<ExpenseEntityPayload> = {};

    if (payerId !== undefined) payload.payer_id = payerId;
    if (title !== undefined) payload.title = title;
    if (description !== undefined) payload.description = description;
    if (amount !== undefined) payload.amount = amount;
    if (splitType !== undefined) payload.split_type = splitType;
    if (expenseDate !== undefined) payload.expense_date = expenseDate;

    return payload;
  },
};
