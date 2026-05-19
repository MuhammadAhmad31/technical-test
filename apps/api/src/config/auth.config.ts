import type { CookieOptions } from "express";
import type { SignOptions } from "jsonwebtoken";
import { getBooleanEnv, getEnv, getNumberEnv } from "./env.js";

const getSameSite = (): CookieOptions["sameSite"] => {
  const value = getEnv("COOKIE_SAME_SITE", "lax").toLowerCase();

  if (value === "strict" || value === "lax" || value === "none") {
    return value;
  }

  return "lax";
};

export const authConfig = {
  accessTokenCookieMaxAgeMs: getNumberEnv("ACCESS_TOKEN_COOKIE_MAX_AGE_MS", 60 * 60 * 1000),
  jwtExpiresIn: getEnv("JWT_EXPIRES_IN", "1h") as SignOptions["expiresIn"],
  jwtSecret: getEnv("JWT_SECRET", "technical-test-local-secret"),
  oauthStateCookieMaxAgeMs: getNumberEnv("OAUTH_STATE_COOKIE_MAX_AGE_MS", 5 * 60 * 1000),
  cookie: {
    httpOnly: true,
    sameSite: getSameSite(),
    secure: getBooleanEnv("COOKIE_SECURE", false)
  } satisfies CookieOptions
};
