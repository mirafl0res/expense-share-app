import axios from "axios";
import { type FastifyInstance, type FastifyPluginOptions } from "fastify";
import { InternalError } from "../errors/errors";

export async function authRoutes(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  fastify.route({
    method: "POST",
    url: "/auth/register",
    handler: async (request, reply) => {
      console.log("Received POST /auth/register");
      const { email, user_id, nickname } = request.body as {
        email: string;
        user_id: string;
        nickname: string;
      };
      const secret = request.headers["x-auth0-secret"];
      console.log("Success!");

      if (secret !== process.env.AUTH0_ACTION_SECRET) {
        return reply.code(401).send({ error: "Unauthorized" });
      }

      console.log("Body received:", request.body);
      
      if (!email || !user_id) {
        return reply.code(400).send({ error: "Missing email or user_id" });
      }

      // Example: Log the received data (replace with DB insert in production)
      console.log("New Auth0 registration:", { email, user_id, nickname });

      // TODO: Validate input, insert user into DB

      console.log("Success!");
      return reply.send({ success: true });
    },
  });
  fastify.route({
    method: "GET",
    url: "/callback",
    handler: async (request, reply) => {
      const code = (request.query as { code?: string }).code;
      if (!code) {
        return reply.code(400).send({ error: "Missing code parameter" });
      }

      try {
        const tokenUrl = Bun.env.AUTH0_TOKEN_URL;
        const clientId = Bun.env.AUTH0_CLIENT_ID;
        const clientSecret = Bun.env.AUTH0_CLIENT_SECRET;
        const redirectUri = Bun.env.REDIRECT_URI;

        if (!tokenUrl || !clientId || !clientSecret || !redirectUri) {
          throw new InternalError({ message: "Missing Auth0 env variables" });
        }
        const tokenResponse = await axios.post(
          tokenUrl,
          {
            grant_type: "authorization_code",
            client_id: clientId,
            client_secret: clientSecret, // Replace with your actual secret
            code,
            redirect_uri: redirectUri,
          },
          {
            headers: { "content-type": "application/json" },
          },
        );

        console.log("Token exchange successful:", {
          token_type: tokenResponse.data.token_type,
          expires_in: tokenResponse.data.expires_in,
          scope: tokenResponse.data.scope,
          access_token: tokenResponse.data.access_token, // *FIXME  Not for production!
          id_token: tokenResponse.data.id_token, // *FIXME  Not for production!
        });
        return reply.send(tokenResponse.data);
      } catch (error: any) {
        return reply.code(500).send({
          error: "Failed to exchange code for tokens",
          details: error.response?.data || error.message,
        });
      }
    },
  });

  fastify.route({
    method: "POST",
    url: "/auth/refresh",
    handler: async (request, reply) => {
      const { refresh_token } = request.body as { refresh_token?: string };
      if (!refresh_token) {
        return reply.code(400).send({ error: "Missing refresh_token" });
      }

      try {
        const tokenUrl = Bun.env.AUTH0_TOKEN_URL;
        const clientId = Bun.env.AUTH0_CLIENT_ID;
        const clientSecret = Bun.env.AUTH0_CLIENT_SECRET;

        if (!tokenUrl || !clientId || !clientSecret) {
          throw new InternalError({ message: "Missing Auth0 env variables" });
        }

        const refreshResponse = await axios.post(
          tokenUrl,
          {
            grant_type: "refresh_token",
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token,
          },
          {
            headers: { "content-type": "application/json" },
          },
        );

        // Log new tokens for dev (remove in production)
        console.log("Refresh token exchange successful:", {
          token_type: refreshResponse.data.token_type,
          expires_in: refreshResponse.data.expires_in,
          scope: refreshResponse.data.scope,
        });

        return reply.send(refreshResponse.data);
      } catch (error: any) {
        return reply.code(500).send({
          error: "Failed to refresh token",
          details: error.response?.data || error.message,
        });
      }
    },
  });
}


// REFACTORED
// export async function authRoutes(
//   fastify: FastifyInstance,
//   _options: FastifyPluginOptions,
// ): Promise<void> {
//   fastify.route({
//     method: "POST",
//     url: "/auth/register",
//     schema: schemas.registerUserSchema,
//     preValidation: verifyAuth0Secret,
//     handler: controllers.registerUser,
//   });
//   // ...other routes...
// }