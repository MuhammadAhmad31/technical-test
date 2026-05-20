import { useCallback, useEffect, useState } from "react";
import { useDebouncedValue } from "../../../shared/hooks/use-debounced-value";
import { fetchRandomUsers } from "../api/random-user.api";
import { RANDOM_USERS_PAGE_SIZE } from "../constants/random-user.constants";
import type { RandomUserTableRow } from "../types/random-user.types";
import { toRandomUserTableRows } from "../utils/random-user-table-row";

export function useRandomUsers() {
  const [users, setUsers] = useState<RandomUserTableRow[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const debouncedQuery = useDebouncedValue(query, 400);

  const loadPage = useCallback(
    async (nextPage: number, append = false) => {
      setLoading(true);

      try {
        const data = await fetchRandomUsers(nextPage, RANDOM_USERS_PAGE_SIZE, debouncedQuery);

        setUsers((current) => {
          const rows = toRandomUserTableRows(data, append ? current.length : 0);
          return append ? [...current, ...rows] : rows;
        });
        setPage(nextPage);
      } catch {
        if (!append) {
          setUsers([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [debouncedQuery]
  );

  useEffect(() => {
    void loadPage(1, false);
  }, [loadPage]);

  return {
    debouncedQuery,
    loading,
    page,
    query,
    setQuery,
    users,
    loadPage
  };
}
