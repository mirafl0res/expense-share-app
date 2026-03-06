import type { FastifySchema } from "fastify";

export const createGroupSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["title", "createdBy"],
    properties: {
      title: { type: "string" },
      createdBy: { type: "string" },
    },
    additionalProperties: false,
  },
};

export const getGroupByIdSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
    additionalProperties: false,
  },
};

export const updateGroupSchema: FastifySchema = {
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

export const deleteGroupSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
    additionalProperties: false,
  },
};

export const softDeleteGroupSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
    additionalProperties: false,
  },
};
