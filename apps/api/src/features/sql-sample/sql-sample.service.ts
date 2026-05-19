import { Injectable, type OnModuleDestroy } from "@nestjs/common";
import type { SqlJoinRow, SqlSampleResponse } from "@repo/shared";
import { DatabaseSync } from "node:sqlite";
import { querySql, schemaSql, seedSql } from "./sql-sample.sql.js";

@Injectable()
export class SqlSampleService implements OnModuleDestroy {
  private readonly database = new DatabaseSync(":memory:");

  constructor() {
    this.bootstrapDatabase();
  }

  getSqlSample(): SqlSampleResponse {
    return {
      database: "SQLite",
      schemaSql,
      seedSql,
      querySql,
      rows: this.database.prepare(querySql).all() as SqlJoinRow[]
    };
  }

  onModuleDestroy() {
    this.database.close();
  }

  private bootstrapDatabase() {
    this.database.exec("PRAGMA foreign_keys = ON;");
    this.database.exec(schemaSql.join("\n"));
    this.database.exec(seedSql.join("\n"));
  }
}
