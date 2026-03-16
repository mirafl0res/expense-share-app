import type { FastifySchema } from "fastify";

export const createExpenseSchema: FastifySchema = {
  body: {
    type: "object",
    required: [
      "expenseGroupId",
      "payerId",
      "title",
      "amount",
      "splitType",
      "expenseDate",
      "participants",
    ],
    properties: {
      expenseGroupId: { type: "string", format: "uuid" },
      payerId: { type: "string", format: "uuid" },
      title: { type: "string", minLength: 1, maxLength: 30 },
      amount: { type: "number", minimum: 0 },
      splitType: { type: "string" },
      expenseDate: { type: "string", format: "date" },
      description: { type: "string", minLength: 1, maxLength: 500 },
      participants: {
        type: "array",
        items: {
          type: "object",
          required: ["userId", "shareAmount"],
          properties: {
            userId: { type: "string", format: "uuid" },
            shareAmount: { type: "number", minimum: 0 },
          },
          additionalProperties: false,
        },
        minItems: 1,
      },
    },
    additionalProperties: false,
  },
};

export const getExpenseByIdSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
    additionalProperties: false,
  },
};

export const updateExpenseSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
    additionalProperties: false,
  },
  body: {
    type: "object",
    properties: {
      payerId: { type: "string", format: "uuid" },
      title: { type: "string", minLength: 1, maxLength: 30 },
      amount: { type: "number", minimum: 0 },
      splitType: { type: "string" },
      expenseDate: { type: "string", format: "date" },
      description: { type: "string" },
    },
    additionalProperties: false,
  },
};

export const deleteExpenseSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
    additionalProperties: false,
  },
};

export const softDeleteExpenseSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
    additionalProperties: false,
  },
};
