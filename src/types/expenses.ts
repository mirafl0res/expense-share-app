export type Expense = {
  id: string;
  createdBy: string;
  groupId: string;
  payerId: string;
  title: string;
  amount: number;
  splitType: string;
  expenseDate: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
  description?: string;
};

export type ExpenseCreateRequest = {
  groupId: string;
  payerId: string;
  title: string;
  amount: number;
  splitType: string;
  expenseDate: string;
  description?: string;
};

export type ExpenseUpdateRequest = Partial<ExpenseCreateRequest>;

export type ExpenseParticipant = {
  expenseId: string;
  participantUserId: string | null;
  shareAmount: number;
  createdAt: string;
};
