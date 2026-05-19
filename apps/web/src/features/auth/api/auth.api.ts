import type { AuthMeResponse, AuthResponse, MessageResponse } from "@repo/shared";
import { apiRequest } from "../../../shared/api/api-client";

export type { AuthResponse, MessageResponse } from "@repo/shared";

export function mockOAuthLogin(username: string) {
  return apiRequest<AuthResponse>("/auth/oauth/mock-login", {
    method: "POST",
    body: { username }
  });
}

export function getCurrentSession() {
  return apiRequest<AuthMeResponse>("/auth/me");
}

export function logout() {
  return apiRequest<MessageResponse>("/auth/logout", {
    method: "POST"
  });
}
