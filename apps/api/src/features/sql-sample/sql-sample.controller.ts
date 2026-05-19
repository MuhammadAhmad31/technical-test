import { Controller, Get, Inject } from "@nestjs/common";
import type { SqlSampleResponse } from "@repo/shared";
import { SqlSampleService } from "./sql-sample.service.js";

@Controller("sql-sample")
export class SqlSampleController {
  constructor(@Inject(SqlSampleService) private readonly sqlSampleService: SqlSampleService) {}

  @Get()
  getSqlSample(): SqlSampleResponse {
    return this.sqlSampleService.getSqlSample();
  }
}
