import type { SqlSampleResponse } from "@repo/shared";
import { apiRequest } from "../../../shared/api/api-client";

export type { SqlSampleResponse } from "@repo/shared";

export function getSqlSample() {
  return apiRequest<SqlSampleResponse>("/sql-sample");
}
