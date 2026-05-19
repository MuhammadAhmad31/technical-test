import type { ListUser } from "@repo/shared";
import type { RandomUserTableRow } from "../types/random-user.types";

export const toRandomUserTableRows = (users: ListUser[], offset = 0): RandomUserTableRow[] =>
  users.map((user, index) => ({
    ...user,
    key: `${user.email}-${user.phone}-${offset + index}`
  }));
