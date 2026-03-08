import { type FastifyInstance, type FastifyPluginOptions } from "fastify";
import * as controllers from "../controllers/users";
import * as schemas from "../schemas/users";
import { sanitizeUserRequest } from "../hooks/sanitizers";

export async function usersRoutes(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  fastifyServer.route({
    method: "POST",
    url: "/users",
    schema: schemas.createUserSchema,
    preValidation: sanitizeUserRequest,
    handler: controllers.createUser,
  });
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
