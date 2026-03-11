import type { FastifySchema } from "fastify";

export const createUserSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["username", "email"],
    properties: {
      username: { type: "string", minLength: 1, maxLength: 30 },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 8 },
    },
    additionalProperties: false,
  },
};

export const getUserByIdSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
    additionalProperties: false,
  },
};

export const updateUserSchema: FastifySchema = {
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
      username: { type: "string", minLength: 1, maxLength: 30 },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 8 },
    },
    additionalProperties: false,
  },
};

export const deleteUserSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
    additionalProperties: false,
  },
};

export const softDeleteUserSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
    additionalProperties: false,
  },
};
