import type { ArrayManipulationRequest, ArrayManipulationResponse } from "@repo/shared";
import { apiRequest } from "../../../shared/api/api-client";

export type { ArrayManipulationRequest, ArrayManipulationResponse } from "@repo/shared";

export function getArraySample() {
  return apiRequest<ArrayManipulationResponse>("/array-manipulation/sample");
}

export function manipulateArray(payload: ArrayManipulationRequest) {
  return apiRequest<ArrayManipulationResponse>("/array-manipulation", {
    method: "POST",
    body: payload
  });
}
