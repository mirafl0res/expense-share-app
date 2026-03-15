import type {
  ExpenseEntity,
  ExpenseEntityPayload,
  ParticipantEntityPayload,
} from "../repository/types/expenses";
import type {
  Expense,
  ExpenseCreateRequest,
  Participant,
  ParticipantRequest,
} from "../types/expenses";

export const ExpenseMapper = {
  toDomain: (entity: ExpenseEntity): Expense => ({
    id: entity.id,
    createdBy: entity.created_by,
    expenseGroupId: entity.expense_group_id,
    payerId: entity.payer_id,
    title: entity.title,
    description: entity.description ?? undefined,
    amount: entity.amount,
    splitType: entity.split_type,
    expenseDate: entity.expense_date,
    createdAt: entity.created_at,
    updatedAt: entity.updated_at ?? undefined,
    deletedAt: entity.deleted_at ?? undefined,
  }),

  toEntityPayload: (expense: Expense): ExpenseEntityPayload => ({
    id: expense.id,
    expense_group_id: expense.expenseGroupId,
    created_by: expense.createdBy,
    payer_id: expense.payerId,
    title: expense.title,
    description: expense.description ?? null,
    amount: expense.amount,
    split_type: expense.splitType,
    expense_date: expense.expenseDate,
  }),

  toPartialEntityPayload: (
    updates: Partial<ExpenseCreateRequest>,
  ): Partial<ExpenseEntityPayload> => {
    const { payerId, title, amount, splitType, expenseDate, description } =
      updates;
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

export const ParticipantMapper = {
  toEntityPayload: (
    participant: ParticipantRequest,
    expenseId: string,
  ): ParticipantEntityPayload => ({
    expense_id: expenseId,
    participant_user_id: participant.userId,
    share_amount: participant.shareAmount,
  }),

  toEntityPayloads: (
    participants: ParticipantRequest[],
    expenseId: string,
  ): ParticipantEntityPayload[] =>
    participants.map((participant) =>
      ParticipantMapper.toEntityPayload(participant, expenseId),
    ),
};
