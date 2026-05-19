export type SqlJoinRow = {
  user_id: string;
  company_id: string;
  nama: string;
  email: string | null;
  telp: string;
  company_code: string;
  company_name: string | null;
};

export type SqlSampleResponse = {
  database: "SQLite";
  schemaSql: string[];
  seedSql: string[];
  querySql: string;
  rows: SqlJoinRow[];
};
