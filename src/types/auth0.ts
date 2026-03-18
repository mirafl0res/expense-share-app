export type Auth0TokenResponse = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  scope: string;
  expires_in: string;
  token_type: string;
};

export type Role = "admin" | "user";
