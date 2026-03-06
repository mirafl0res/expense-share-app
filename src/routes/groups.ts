import { type FastifyInstance, type FastifyPluginOptions } from "fastify";
import controllers from "../controllers";

async function routes(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  fastifyServer.route({
    method: "POST",
    url: "/groups",
    handler: controllers.groups.createGroup,
  });
  fastifyServer.route({
    method: "GET",
    url: "/groups/:id",
    handler: controllers.groups.getGroupById,
  });
  fastifyServer.route({
    method: "PATCH",
    url: "/groups/:id",
    handler: controllers.groups.updateGroup,
  });
//   fastifyServer.route({
//     method: "PATCH",
//     url: "/groups/:id",
//     handler: controllers.groups.softDeleteGroup,
//   });
  fastifyServer.route({
    method: "DELETE",
    url: "/groups/:id",
    handler: controllers.groups.hardDeleteGroup,
  });
}

export default routes;
