import { Controller, Get, Inject, Query } from "@nestjs/common";
import type { RandomUsersResponse } from "@repo/shared";
import { RandomUserService } from "./random-user.service.js";

@Controller("random-users")
export class RandomUserController {
  constructor(@Inject(RandomUserService) private readonly randomUserService: RandomUserService) {}

  @Get()
  async list(
    @Query("results") results?: string,
    @Query("page") page?: string,
    @Query("search") search?: string
  ): Promise<RandomUsersResponse> {
    const payload = await this.randomUserService.list({
      page: Number(page),
      results: Number(results),
      search
    });

    return {
      page: payload.page,
      search: payload.search,
      results: payload.data.length,
      data: payload.data
    };
  }
}
