import type { FastifySchema } from "fastify";

export const registerUserSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["email", "user_id"],
    properties: {
      email: { type: "string", format: "email" },
      user_id: { type: "string", minLength: 1 },
      name: { type: "string" },
      nickname: { type: "string" },
    },
    additionalProperties: false,
  },
};
