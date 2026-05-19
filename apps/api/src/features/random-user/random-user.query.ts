import type { ListRandomUsersInput, NormalizedRandomUsersQuery } from "./random-user.types.js";

const DEFAULT_PAGE = 1;
const DEFAULT_RESULTS = 10;
const MIN_RESULTS = 1;
const MAX_RESULTS = 100;

export const normalizeRandomUsersQuery = (
  input: ListRandomUsersInput = {}
): NormalizedRandomUsersQuery => {
  const requestedResults = positiveIntegerOr(input.results, DEFAULT_RESULTS);

  return {
    page: positiveIntegerOr(input.page, DEFAULT_PAGE),
    results: Math.min(Math.max(requestedResults, MIN_RESULTS), MAX_RESULTS),
    search: input.search?.trim().toLowerCase() ?? ""
  };
};

const positiveIntegerOr = (value: number | undefined, fallback: number): number => {
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    return fallback;
  }

  return value;
};
