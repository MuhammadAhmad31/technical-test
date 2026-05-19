import { Module } from "@nestjs/common";
import { SqlSampleController } from "./sql-sample.controller.js";
import { SqlSampleService } from "./sql-sample.service.js";

@Module({
  controllers: [SqlSampleController],
  providers: [SqlSampleService]
})
export class SqlSampleModule {}
