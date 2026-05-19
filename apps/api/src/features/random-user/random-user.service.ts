import { Injectable } from "@nestjs/common";
import type { ListUser } from "@repo/shared";
import { randomUserConfig } from "../../config/random-user.config.js";
import { mapRandomUserToListUser } from "./random-user.mapper.js";
import { normalizeRandomUsersQuery } from "./random-user.query.js";
import type {
  ListRandomUsersInput,
  NormalizedRandomUsersQuery,
  RandomUserApiResponse
} from "./random-user.types.js";

@Injectable()
export class RandomUserService {
  async list(input: ListRandomUsersInput = {}) {
    const query = normalizeRandomUsersQuery(input);
    const payload = await this.fetchRandomUsers(query);
    const users = payload.results.map(mapRandomUserToListUser);

    return {
      page: query.page,
      search: query.search,
      data: this.filterUsers(users, query.search)
    };
  }

  private async fetchRandomUsers(query: NormalizedRandomUsersQuery): Promise<RandomUserApiResponse> {
    const url = new URL(randomUserConfig.apiUrl);

    url.searchParams.set("results", String(query.results));
    url.searchParams.set("page", String(query.page));
    url.searchParams.set("seed", randomUserConfig.apiSeed);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`RandomUser returned ${response.status}`);
    }

    return (await response.json()) as RandomUserApiResponse;
  }

  private filterUsers(users: ListUser[], search: string) {
    if (!search) {
      return users;
    }

    return users.filter((user) =>
      [user.name, user.location, user.email, String(user.age), user.phone, user.cell]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }
}
