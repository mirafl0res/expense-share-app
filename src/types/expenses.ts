export type Expense = {
  id: string;
  createdBy: string | null;
  groupId: string;
  payerId: string | null;
  title: string;
  amount: number;
  splitType: string;
  expenseDate: string;
  updatedAt: string | null;
  createdAt: string | null;
  deletedAt: string | null;
};

export type ExpenseCreateRequest = {
  groupId: string;
  payerId: string;
  title: string;
  amount: number;
  splitType: string;
  expenseDate: string;
};

export type ExpenseUpdateRequest = Omit<ExpenseCreateRequest, "groupId">;

export type ExpenseParticipant = {
  expenseId: string;
  participantUserId: string | null;
  shareAmount: number;
  createdAt: string;
};
