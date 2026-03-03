export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type CreateUserRequest = {
  username: string;
  email: string;
  password: string;
};

export type Expense = {
  id: string;
  createdBy: string | null;
  groupId: string;
  payerId: string | null;
  title: string;
  amount: number;
  splitType: string;
  expenseDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type ExpenseCreateRequest = {
  groupId: string;
  payerId: string;
  title: string;
  amount: number;
  splitType: string;
  expenseDate: string;
};

export type ExpenseParticipant = {
  expenseId: string;
  participantUserId: string | null;
  shareAmount: number;
  createdAt: string;
};

export type Group = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type CreateGroupRequest = Pick<Group, "title">;
