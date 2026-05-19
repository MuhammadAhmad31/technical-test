import { API_BASE_URL } from "../config/api.config";

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

function buildApiUrl(path: string) {
  if (path.startsWith("http")) {
    return path;
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function parseResponseBody(text: string) {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function responseMessage(payload: unknown) {
  if (typeof payload === "object" && payload !== null && "message" in payload) {
    const message = (payload as { message: unknown }).message;
    return Array.isArray(message) ? message.join(", ") : String(message);
  }

  return null;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}) {
  const hasBody = options.body !== undefined;
  const headers = new Headers(options.headers);

  if (hasBody && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  const response = await fetch(buildApiUrl(path), {
    ...options,
    body: hasBody ? JSON.stringify(options.body) : undefined,
    credentials: options.credentials ?? "include",
    headers
  });
  const text = await response.text();
  const payload = text ? parseResponseBody(text) : null;

  if (!response.ok) {
    throw new Error(responseMessage(payload) ?? `API returned ${response.status}`);
  }

  return payload as T;
}
