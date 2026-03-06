import { type FastifyInstance, type FastifyPluginOptions } from "fastify";
import controllers from "../controllers";

async function routes(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  fastifyServer.route({
    method: "POST",
    url: "/users",
    handler: controllers.users.createUser,
  });
  fastifyServer.route({
    method: "GET",
    url: "/users/:id",
    handler: controllers.users.getUserById,
  });
  fastifyServer.route({
    method: "PATCH",
    url: "/users/:id/",
    handler: controllers.users.updateUser,
  });
//   fastifyServer.route({
//     method: "PATCH",
//     url: "/users/:id",
//     handler: controllers.users.softDeleteUser,
//   });
  fastifyServer.route({
    method: "DELETE",
    url: "/users/:id",
    handler: controllers.users.hardDeleteUser,
  });
}

export default routes;
