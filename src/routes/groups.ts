import { type FastifyInstance, type FastifyPluginOptions } from "fastify";
import * as groupController from "../controllers/groups";
import * as schemas from "../schemas/groups";
import { sanitizeGroupRequest } from "../hooks/sanitizers";

export async function groupRoutes(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  fastifyServer.route({
    method: "POST",
    url: "/groups",
    schema: schemas.createGroupSchema,
    preValidation: sanitizeGroupRequest,
    preHandler: fastifyServer.requireAuth,
    handler: groupController.createGroup,
  });
  
  fastifyServer.route({
    method: "GET",
    url: "/groups/:id",
    schema: schemas.getGroupByIdSchema,
    preHandler: fastifyServer.requireAuth,
    handler: groupController.getGroupById,
  });
  
  fastifyServer.route({
    method: "PATCH",
    url: "/groups/:id",
    schema: schemas.updateGroupSchema,
    preValidation: sanitizeGroupRequest,
    preHandler: fastifyServer.requireAuth,
    handler: groupController.updateGroup,
  });
  
  fastifyServer.route({
    method: "DELETE",
    url: "/groups/:id",
    schema: schemas.deleteGroupSchema,
    preHandler: fastifyServer.requireAuth,
    handler: groupController.deleteGroup,
  });
  
  // fastifyServer.route({
  //   method: "PATCH",
  //   url: "/groups/:id",
  //   schema: schemas.softDeleteGroupSchema,
  //   handler: groupController.softDeleteGroup,
  // });
}
