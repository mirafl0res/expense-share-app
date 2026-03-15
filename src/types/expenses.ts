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

export type Participant = {
  expenseId: string;
  userId: string;
  shareAmount: number;
  createdAt?: string;
};

export type ParticipantRequest = {
  userId: string;
  shareAmount: number;
};

export type ExpenseWithParticipantsRequest = ExpenseCreateRequest & {
  participants: ParticipantRequest[];
};
