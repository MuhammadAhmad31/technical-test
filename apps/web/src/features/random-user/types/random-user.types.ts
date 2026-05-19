import type { ListUser } from "@repo/shared";

export type RandomUserTableRow = ListUser & {
  key: string;
};
