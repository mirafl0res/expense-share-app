import { password } from "bun";
import type { FastifySchema } from "fastify";

// Type can be: number, integer, string, boolean, array, object or null.

export const createUserSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["username", "email", "password"],
    properties: {
      username: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
    },
    additionalProperties: false,
  },
};

export const getUserByIdSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
    additionalProperties: false,
  },
};

export const updateUserSchema: FastifySchema = {
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
      username: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
    },
    additionalProperties: false,
  },
};

export const deleteUserSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
    additionalProperties: false,
  },
};

export const softDeleteUserSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
    additionalProperties: false,
  },
};
