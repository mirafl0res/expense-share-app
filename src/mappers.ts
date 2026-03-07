import type {
  ExpenseEntity,
  ExpenseUpdatePayload,
} from "./repository/types/expenses";
import type {
  GroupEntity,
  GroupUpdatePayload,
} from "./repository/types/groups";
import type { UserEntity, UserUpdatePayload } from "./repository/types/users";
import type { Expense, ExpenseUpdateRequest } from "./types/expenses";
import type { Group, GroupUpdateRequest } from "./types/groups";
import type { User, UserUpdateRequest } from "./types/users";

// *REVIEW[epic=mappers] - Should domain -> entity include timestamps?
// TODO[epic=authentication]: implement password hashing

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
  toEntity(expense: Expense): ExpenseEntity {
    return {
      id: expense.id,
      group_id: expense.groupId,
      created_by: expense.createdBy,
      payer_id: expense.payerId,
      title: expense.title,
      amount: expense.amount,
      split_type: expense.splitType,
      expense_date: expense.expenseDate,
      // created_at: expense.createdAt,
      // updated_at: expense.updatedAt,
      // deleted_at: expense.deletedAt,
    };
  },
  toPartialEntity(updates: ExpenseUpdateRequest): ExpenseUpdatePayload {
    const { payerId, title, amount, splitType, expenseDate } = updates;
    const payload: ExpenseUpdatePayload = {};

    if (payerId !== undefined) payload.payer_id = payerId;
    if (title !== undefined) payload.title = title;
    if (amount !== undefined) payload.amount = amount;
    if (splitType !== undefined) payload.split_type = splitType;
    if (expenseDate !== undefined) payload.expense_date = expenseDate;

    return payload;
  },
};

export const UserMapper = {
  toDomain(entity: UserEntity): User {
    return {
      id: entity.id,
      username: entity.username,
      email: entity.email,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      deletedAt: entity.deleted_at,
    };
  },
  toEntity(user: User): UserEntity {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password_hash: "",
      // created_at: user.createdAt,
      // updated_at: user.updatedAt,
      // deleted_at: user.deletedAt,
    };
  },
  toPartialEntity(updates: UserUpdateRequest): UserUpdatePayload {
    const { username, email, password } = updates;
    const payload: UserUpdatePayload = {};

    if (username !== undefined) payload.username = username;
    if (email !== undefined) payload.email = email;
    if (password !== undefined) payload.password_hash = password;

    return payload;
  },
};

export const GroupMapper = {
  toDomain(entity: GroupEntity): Group {
    return {
      id: entity.id,
      title: entity.title,
      createdBy: entity.created_by,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      deletedAt: entity.deleted_at,
    };
  },
  toEntity(group: Group): GroupEntity {
    return {
      id: group.id,
      title: group.title,
      created_by: group.createdBy,
      // created_at: group.createdAt,
      // updated_at: group.updatedAt,
      // deleted_at: group.deletedAt,
    };
  },
  toPartialEntity(updates: GroupUpdateRequest): GroupUpdatePayload {
    const payload: GroupUpdatePayload = {};

    if (!updates.title !== undefined) payload.title = updates.title;

    return payload;
  },
};
