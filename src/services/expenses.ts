import type {
  ExpenseCreateRequest,
  Expense,
  ExpenseUpdateRequest,
} from "../types/expenses";
import repository from "../repository";
import { ExpenseMapper } from "../mappers";
import { NotFoundError } from "../errors";

export async function createExpense(
  data: ExpenseCreateRequest,
): Promise<Expense> {
  const testUserId = "11111111-1111-1111-1111-111111111111";
  const newExpense: Expense = {
    id: crypto.randomUUID(),
    createdBy: testUserId, // TODO[epic=authentication]: Implement JWT verification
    groupId: data.groupId,
    payerId: data.payerId,
    title: data.title,
    amount: data.amount,
    splitType: data.splitType,
    expenseDate: data.expenseDate,
  };

  const result = await repository.expenses.insertExpense(
    ExpenseMapper.toEntity(newExpense),
  );

  return ExpenseMapper.toDomain(result);
}

export async function getExpenseById(id: string): Promise<Expense> {
  const result = await repository.expenses.getExpenseById(id);
  if (!result) {
    throw new NotFoundError({ message: "Expense not found" });
  }
  return ExpenseMapper.toDomain(result);
}

export async function updateExpense(
  id: string,
  data: ExpenseUpdateRequest,
): Promise<Expense | null> {
  const updates = ExpenseMapper.toPartialEntity(data);

  const result = await repository.expenses.updateExpense(id, updates);
  if (!result) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  return ExpenseMapper.toDomain(result);
}

export async function softDeleteExpense(id: string): Promise<boolean> {
  const result = await repository.expenses.softDeleteExpense(id);
  return result;
}
