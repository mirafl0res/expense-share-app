import { type FastifyInstance, type FastifyPluginOptions } from "fastify";
import * as userController from "../controllers/users";
import * as schemas from "../schemas/users";
import { sanitizeUserRequest } from "../hooks/sanitizers";
// import { verifyAuth0Secret } from "../hooks/auth";

export async function usersRoutes(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  
  /**
  |--------------------------------------------------
  | User creation/registration is handled via 
  | the /auth/callback route after Auth0 authentication.
  | Currently there is no manual registration endpoint.
  |--------------------------------------------------
  */

  fastifyServer.route({
    method: "GET",
    url: "/users/:id",
    schema: schemas.getUserByIdSchema,
    preHandler: fastifyServer.requireAuth,
    handler: userController.getUserById,
  });
  fastifyServer.route({
    method: "PATCH",
    url: "/users/:id/",
    schema: schemas.updateUserSchema,
    preValidation: sanitizeUserRequest,
    preHandler: fastifyServer.requireAuth,
    handler: userController.updateUser,
  });
  fastifyServer.route({
    method: "DELETE",
    url: "/users/:id",
    schema: schemas.deleteUserSchema,
    preHandler: fastifyServer.requireAdmin,
    handler: userController.deleteUser,
  });

  /**
  |--------------------------------------------------
  | Soft-delete not yet fully implemented.
  |--------------------------------------------------
  */
  // fastifyServer.route({
  //   method: "PATCH",
  //   url: "/users/:id",
  //   schema: schemas.softDeleteUserSchema,
  //   handler: userController.softDeleteUser,
  // });
}
