import type {
  Expense,
  ExpenseCreateRequest,
  ExpenseWithParticipantsRequest,
  Participant,
  ParticipantRequest,
} from "../types/expenses";
import * as expenseRepository from "../repository/expenses";
import { ExpenseMapper, ParticipantMapper } from "../mappers/expenses";
import { NotFoundError } from "../errors/errors";

export async function createExpense(
  data: ExpenseWithParticipantsRequest,
  userId: string,
): Promise<Expense> {
  const expenseData: Expense = {
    id: crypto.randomUUID(),
    createdBy: userId,
    expenseGroupId: data.expenseGroupId,
    payerId: data.payerId ?? userId,
    title: data.title,
    amount: data.amount,
    splitType: data.splitType,
    expenseDate: data.expenseDate ?? new Date().toISOString().slice(0, 10),
    description: data.description,
  };

  const expenseEntityPayload = ExpenseMapper.toEntityPayload(expenseData);

  const participantEntityPayloads = ParticipantMapper.toEntityPayloads(
    data.participants,
    expenseData.id,
  );

  const result = await expenseRepository.insertExpenseWithParticipants(
    expenseEntityPayload,
    participantEntityPayloads,
  );

  return ExpenseMapper.toDomain(result);
}

export async function getExpenseById(id: string): Promise<Expense> {
  const result = await expenseRepository.getExpenseById(id);

  if (!result) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  return ExpenseMapper.toDomain(result);
}

export async function updateExpense(
  expenseId: string,
  data: Partial<ExpenseCreateRequest>,
): Promise<Expense> {
  const updates = ExpenseMapper.toPartialEntityPayload(data);

  const result = await expenseRepository.updateExpense(expenseId, updates);

  if (!result) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  return ExpenseMapper.toDomain(result);
}

export async function softDeleteExpense(id: string): Promise<boolean> {
  const deleted = await expenseRepository.softDeleteExpense(id);

  if (!deleted) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  return deleted;
}

export async function hardDeleteExpense(expenseId: string): Promise<boolean> {
  const deleted = await expenseRepository.hardDeleteExpense(expenseId);

  if (!deleted) {
    throw new NotFoundError({ message: "Expense not found" });
  }

  return deleted;
}

export async function createExpenseParticipant(
  participant: ParticipantRequest,
  expenseId: string,
): Promise<Participant> {
  const participantEntity = ParticipantMapper.toEntityPayload(
    participant,
    expenseId,
  );

  const result = await expenseRepository.insertParticipant(participantEntity);

  return ParticipantMapper.toDomain(result);
}
