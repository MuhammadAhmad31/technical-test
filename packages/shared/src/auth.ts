export type JwtSessionContext = {
  id: string;
  username: string;
  iat: number;
  exp: number;
};

export type OAuthStartResponse = {
  message: string;
  state: string;
  username: string;
  authorizationUrl: string;
};

export type AuthResponse = {
  message: string;
  context: JwtSessionContext;
};

export type AuthMeResponse = {
  context: JwtSessionContext;
};

export type MessageResponse = {
  message: string;
};
