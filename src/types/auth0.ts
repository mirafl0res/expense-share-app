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

export type Auth0TokenResponse = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  scope: string;
  expires_in: string;
  token_type: string;
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
