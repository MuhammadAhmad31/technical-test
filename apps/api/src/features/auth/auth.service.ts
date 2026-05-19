import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import type { JwtSessionContext } from "@repo/shared";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { authConfig } from "../../config/auth.config.js";

type UserRecord = {
  id: string;
  username: string;
};

type SignedSession = {
  token: string;
  context: JwtSessionContext;
};

@Injectable()
export class AuthService {
  private readonly usersByUsername = new Map<string, UserRecord>();

  createOAuthStart(username?: string) {
    const normalizedUsername = this.normalizeUsername(username);
    const state = randomUUID();

    return {
      state,
      username: normalizedUsername,
      authorizationUrl: `/api/auth/oauth/callback?state=${state}&username=${encodeURIComponent(
        normalizedUsername
      )}`
    };
  }

  completeOAuthCallback(params: {
    state?: string;
    cookieState?: string;
    username?: string;
  }): SignedSession {
    if (!params.state || params.state !== params.cookieState) {
      throw new UnauthorizedException("Invalid OAuth state");
    }

    const username = this.normalizeUsername(params.username);

    if (this.usersByUsername.has(username)) {
      throw new ConflictException("Username must be unique");
    }

    const user = {
      id: randomUUID(),
      username
    };
    this.usersByUsername.set(username, user);

    return this.signSession(user);
  }

  verifyToken(token?: string): JwtSessionContext {
    if (!token) {
      throw new UnauthorizedException("Missing session cookie");
    }

    const decoded = jwt.verify(token, this.jwtSecret) as JwtPayload;

    if (
      typeof decoded.id !== "string" ||
      typeof decoded.username !== "string" ||
      typeof decoded.iat !== "number" ||
      typeof decoded.exp !== "number"
    ) {
      throw new UnauthorizedException("Invalid session token");
    }

    return {
      id: decoded.id,
      username: decoded.username,
      iat: decoded.iat,
      exp: decoded.exp
    };
  }

  private signSession(user: UserRecord): SignedSession {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      this.jwtSecret,
      {
        expiresIn: authConfig.jwtExpiresIn
      }
    );

    return {
      token,
      context: this.verifyToken(token)
    };
  }

  private normalizeUsername(username?: string) {
    const fallback = `user_${Date.now()}`;
    return (username || fallback).trim().toLowerCase().replace(/\s+/g, "_");
  }

  private get jwtSecret() {
    return authConfig.jwtSecret;
  }
}
