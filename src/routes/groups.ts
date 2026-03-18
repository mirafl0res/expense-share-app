import { type FastifyInstance, type FastifyPluginOptions } from "fastify";
import * as groupController from "../controllers/groups";
import * as schemas from "../schemas/groups";
import { sanitizeGroupRequest } from "../hooks/sanitizers";
import { requireRole } from "../hooks/roles";

export async function groupRoutes(
  fastifyServer: FastifyInstance,
  options: FastifyPluginOptions,
): Promise<void> {
  fastifyServer.route({
    method: "POST",
    url: "/groups",
    schema: schemas.createGroupSchema,
    preValidation: sanitizeGroupRequest,
    preHandler: [fastifyServer.requireAuth(), requireRole("admin")],
    handler: groupController.createGroup,
  });

  fastifyServer.route({
    method: "GET",
    url: "/groups/:id",
    schema: schemas.getGroupByIdSchema,
    preHandler: [fastifyServer.requireAuth()],
    handler: groupController.getGroupById,
  });

  fastifyServer.route({
    method: "PATCH",
    url: "/groups/:id",
    schema: schemas.updateGroupSchema,
    preValidation: sanitizeGroupRequest,
    preHandler: [fastifyServer.requireAuth(), requireRole("admin")],
    handler: groupController.updateGroup,
  });

  fastifyServer.route({
    method: "DELETE",
    url: "/groups/:id",
    schema: schemas.deleteGroupSchema,
    preHandler: [fastifyServer.requireAuth(), requireRole("admin")],
    handler: groupController.deleteGroup,
  });

  /**
  |--------------------------------------------------
  | To be implemented: softDelete
  |--------------------------------------------------
  */
  // fastifyServer.route({
  //   method: "PATCH",
  //   url: "/groups/:id",
  //   schema: schemas.softDeleteGroupSchema,
  //   handler: groupController.softDeleteGroup,
  // });
}
