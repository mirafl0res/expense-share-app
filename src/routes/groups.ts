import { type FastifyInstance, type FastifyPluginOptions } from "fastify";
import * as controllers from "../controllers/groups";
import * as schemas from "../schemas/groups";
import { sanitizeGroupRequest } from "../hooks/sanitizers";

export async function groupsRoutes(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  fastifyServer.route({
    method: "POST",
    url: "/groups",
    schema: schemas.createGroupSchema,
    preValidation: sanitizeGroupRequest,
    handler: controllers.createGroup,
  });
  fastifyServer.route({
    method: "GET",
    url: "/groups/:id",
    schema: schemas.getGroupByIdSchema,
    handler: controllers.getGroupById,
  });
  fastifyServer.route({
    method: "PATCH",
    url: "/groups/:id",
    schema: schemas.updateGroupSchema,
    preValidation: sanitizeGroupRequest,
    handler: controllers.updateGroup,
  });
  fastifyServer.route({
    method: "DELETE",
    url: "/groups/:id",
    schema: schemas.deleteGroupSchema,
    handler: controllers.deleteGroup,
  });
  // fastifyServer.route({
  //   method: "PATCH",
  //   url: "/groups/:id",
  //   schema: schemas.softDeleteGroupSchema,
  //   handler: controllers.softDeleteGroup,
  // });
}
