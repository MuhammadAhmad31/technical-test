import { Body, Controller, Get, Inject, Post, Query, Req, Res } from "@nestjs/common";
import type { AuthMeResponse, AuthResponse, MessageResponse, OAuthStartResponse } from "@repo/shared";
import type { Request, Response } from "express";
import { authConfig } from "../../config/auth.config.js";
import { AuthService } from "./auth.service.js";

@Controller("auth")
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Get("oauth/start")
  startOAuth(
    @Query("username") username: string | undefined,
    @Res({ passthrough: true }) res: Response
  ): OAuthStartResponse {
    const payload = this.authService.createOAuthStart(username);

    res.cookie("oauth_state", payload.state, {
      ...authConfig.cookie,
      maxAge: authConfig.oauthStateCookieMaxAgeMs
    });

    return {
      message: "Open authorizationUrl to complete the OAuth callback.",
      ...payload
    };
  }

  @Get("oauth/callback")
  completeOAuth(
    @Query("state") state: string | undefined,
    @Query("username") username: string | undefined,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): AuthResponse {
    const session = this.authService.completeOAuthCallback({
      state,
      username,
      cookieState: req.cookies?.oauth_state
    });

    res.cookie("access_token", session.token, {
      ...authConfig.cookie,
      maxAge: authConfig.accessTokenCookieMaxAgeMs
    });
    res.clearCookie("oauth_state");

    return {
      message: "OAuth login success. JWT is stored in httpOnly cookie.",
      context: session.context
    };
  }

  @Post("oauth/mock-login")
  mockLogin(
    @Body("username") username: string | undefined,
    @Res({ passthrough: true }) res: Response
  ): AuthResponse {
    const start = this.authService.createOAuthStart(username);
    const session = this.authService.completeOAuthCallback({
      state: start.state,
      cookieState: start.state,
      username: start.username
    });

    res.cookie("access_token", session.token, {
      ...authConfig.cookie,
      maxAge: authConfig.accessTokenCookieMaxAgeMs
    });

    return {
      message: "Mock OAuth login success for local testing.",
      context: session.context
    };
  }

  @Get("me")
  me(@Req() req: Request): AuthMeResponse {
    return {
      context: this.authService.verifyToken(req.cookies?.access_token)
    };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response): MessageResponse {
    res.clearCookie("access_token");
    return {
      message: "Logged out"
    };
  }
}
