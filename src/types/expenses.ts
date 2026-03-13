export type Expense = {
  id: string;
  createdBy: string;
  expenseGroupId: string;
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
  expenseGroupId: string;
  payerId: string;
  title: string;
  amount: number;
  splitType: string;
  expenseDate: string;
  description?: string;
};

export type ExpenseParticipant = {
  expenseId: string;
  participantUserId: string | null;
  shareAmount: number;
  createdAt: string;
};
