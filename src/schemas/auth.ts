import type { FastifySchema } from "fastify";

// *NOTE - Schema is never used
export const registerAuth0UserSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["email", "userId"],
    properties: {
      email: { type: "string", format: "email" },
      user_id: { type: "string", minLength: 1 },
      name: { type: "string", minLength: 1 },
      nickname: { type: "string", minLength: 1 },
    },
    additionalProperties: false,
  },
};
