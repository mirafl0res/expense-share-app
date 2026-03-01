export type Expense = {
  id: string;
  groupId: string;
  payerId: string;
  title: string;
  amount: number;
  splitType: string;
  expenseDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type CreateExpenseRequest = Pick<
  Expense,
  "groupId" | "payerId" | "title" | "amount" | "splitType" | "expenseDate"
>;
