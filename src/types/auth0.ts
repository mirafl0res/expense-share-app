export type Auth0AccessTokenPayload = {
  sub: string;
  [key: string]: string;
};
export type Auth0IdTokenPayload = {
  auth0Sub: string;
  email: string;
  name?: string;
  nickname?: string;
  picture?: string;
};

export type Auth0TokenRequestParams = {
  tokenUrl: string;
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
};

export type AuthCodeExchangeRequest = {
  code: string;
  redirectUri: string;
};
