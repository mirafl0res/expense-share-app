import type { FastifySchema } from "fastify";

export const registerAuth0UserSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["idToken"],
    properties: {
      idToken: { type: "string", minLength: 1 },
    },
    additionalProperties: false,
  },
};
