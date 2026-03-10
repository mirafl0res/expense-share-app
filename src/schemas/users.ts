import type { FastifySchema } from "fastify";

// Type can be: number, integer, string, boolean, array, object or null.

// TODO[epic=auth]: Structure/update/define registerAuth0 schema vs createOrLoginUser (no Auth0)
export const createOrLoginUserSchema: FastifySchema = {
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

export const registerAuth0UserSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["email", "user_id"],
    properties: {
      email: { type: "string", format: "email" },
      user_id: { type: "string", minLength: 1 },
      name: { type: "string", minLength: 1 },
      nickname: { type: "string", minLength: 1 },
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
