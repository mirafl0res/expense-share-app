import { type FastifyInstance, type FastifyPluginOptions } from "fastify";
import * as controllers from "../controllers/users";
import * as schemas from "../schemas/users";
import { sanitizeUserRequest } from "../hooks/sanitizers";
// import { verifyAuth0Secret } from "../hooks/auth";

export async function usersRoutes(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  /**
  |--------------------------------------------------
  | User creation/registration is handled via the /auth/callback route after Auth0 authentication.
  | Currently, there is no manual user registration endpoint.
  |--------------------------------------------------
  */

  // fastifyServer.route({
  //   method: "POST",
  //   url: "/users",
  //   schema: schemas.createUserSchema,
  //   preValidation: sanitizeUserRequest,
  //   handler: controllers.createOrLoginUser,
  // });

  // fastifyServer.route({
  //   method: "POST",
  //   url: "/auth/register",
  //   schema: schemas.registerAuth0UserSchema,
  //   preValidation: verifyAuth0Secret,
  //   handler: controllers.registerAuth0User,
  // });


  fastifyServer.route({
    method: "GET",
    url: "/users/:id",
    schema: schemas.getUserByIdSchema,
    handler: controllers.getUserById,
  });
  fastifyServer.route({
    method: "PATCH",
    url: "/users/:id/",
    schema: schemas.updateUserSchema,
    preValidation: sanitizeUserRequest,
    handler: controllers.updateUser,
  });
  fastifyServer.route({
    method: "DELETE",
    url: "/users/:id",
    schema: schemas.deleteUserSchema,
    handler: controllers.deleteUser,
  });
  // fastifyServer.route({
  //   method: "PATCH",
  //   url: "/users/:id",
  //   schema: schemas.softDeleteUserSchema,
  //   handler: controllers.softDeleteUser,
  // });
}
