import "@auth0/auth0-fastify-api";

declare module "@auth0/auth0-fastify-api" {
  interface Token {
    sub: string;
    permissions?: string[];
    "https://expense-share-app.com/roles"?: string[];
    email: string;
    nickname?: string;
  }
}