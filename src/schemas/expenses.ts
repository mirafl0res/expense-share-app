import type { FastifySchema } from "fastify";

export const createExpenseSchema: FastifySchema = {
  body: {
    type: "object",
    required: [
      "groupId",
      "title",
      "amount",
      "splitType",
      "expenseDate",
    ],
    properties: {
      groupId: { type: "string", format: "uuid" },
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
