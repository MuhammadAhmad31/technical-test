import type { RandomUsersResponse } from "@repo/shared";
import { apiRequest } from "../../../shared/api/api-client";

export async function fetchRandomUsers(page: number, results: number, search = "") {
  const params = new URLSearchParams({
    page: String(page),
    results: String(results)
  });

  if (search.trim()) {
    params.set("search", search.trim());
  }

  const payload = await apiRequest<RandomUsersResponse>(`/random-users?${params.toString()}`);
  return payload.data;
}
