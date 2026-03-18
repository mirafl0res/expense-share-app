// import fastifyPlugin from "fastify-plugin";
// import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
// import { ForbiddenError } from "../errors/errors";

// async function rolesPlugin(fastify: FastifyInstance) {
//   fastify.decorate(
//     "requireAdmin",
//     async function (request: FastifyRequest, reply: FastifyReply) {
//       const roles = request.user["https://expense-share-app.com/roles"] || [];
//       if (!roles.includes("admin")) {
//         throw new ForbiddenError({
//           message: "Forbidden: admin access required",
//         });
//       }
//     },
//   );
// }

// export default fastifyPlugin(rolesPlugin);
