import type { FastifySchema } from "fastify";

export const createExpenseSchema: FastifySchema = {
  body: {
    type: "object",
    required: [
      "groupId",
      "payerId",
      "title",
      "amount",
      "splitType",
      "expenseDate",
    ],
    properties: {
      groupId: { type: "string" },
      payerId: { type: "string" },
      title: { type: "string" },
      amount: { type: "number" },
      splitType: { type: "string" },
      expenseDate: { type: "string", format: "date" },
    },
    additionalProperties: false,
  },
};

export const getExpenseByIdSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
    additionalProperties: false,
  },
};

export const updateExpenseSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
    additionalProperties: false,
  },
  body: {
    type: "object",
    properties: {
      payerId: { type: "string" },
      title: { type: "string" },
      amount: { type: "number" },
      splitType: { type: "string" },
      expenseDate: { type: "string", format: "date" },
    },
    additionalProperties: false,
  },
};

export const deleteExpenseSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
    additionalProperties: false,
  },
};

export const softDeleteExpenseSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
    additionalProperties: false,
  },
};
