import { DatabaseOutlined } from "@ant-design/icons";
import type { SqlJoinRow } from "@repo/shared";
import { Button, Collapse, Empty, Space, Table, Typography, type CollapseProps, type TableColumnsType } from "antd";
import { useState } from "react";
import { AnswerCard } from "../../../shared/components/answer-card";
import { idlePanelState, runPanel, type PanelState } from "../../../shared/utils/panel-state";
import { getSqlSample, type SqlSampleResponse } from "../api/sql-sample.api";

const { Text } = Typography;

const sqlColumns: TableColumnsType<SqlJoinRow> = [
  {
    title: "ID Pengguna",
    dataIndex: "user_id"
  },
  {
    title: "ID Perusahaan",
    dataIndex: "company_id"
  },
  {
    title: "Nama",
    dataIndex: "nama"
  },
  {
    title: "Email",
    dataIndex: "email",
    render: (value: string | null) => value ?? "-"
  },
  {
    title: "Telp",
    dataIndex: "telp"
  },
  {
    title: "Kode Perusahaan",
    dataIndex: "company_code"
  },
  {
    title: "Nama Perusahaan",
    dataIndex: "company_name",
    render: (value: string | null) => value ?? "-"
  }
];

function SqlCodeBlock({ code }: { code: string }) {
  return <pre className="sql-code-block">{code}</pre>;
}

function SqlScriptPanel({ data }: { data: SqlSampleResponse | null }) {
  if (!data) {
    return (
      <div className="sql-empty-state">
        <Empty description="Klik Muat Contoh SQL untuk melihat skema, data awal, query, dan hasil join." />
      </div>
    );
  }

  const items: CollapseProps["items"] = [
    {
      key: "schema",
      label: "Skema",
      children: data.schemaSql.map((sql) => <SqlCodeBlock code={sql} key={sql} />)
    },
    {
      key: "seed",
      label: "Data Awal",
      children: data.seedSql.map((sql) => <SqlCodeBlock code={sql} key={sql} />)
    },
    {
      key: "query",
      label: "Query Join",
      children: <SqlCodeBlock code={data.querySql} />
    }
  ];

  return (
    <div className="sql-script-panel">
      <div className="sql-database-meta">
        <Text type="secondary">Basis Data</Text>
        <Text strong>{data.database}</Text>
      </div>

      <Collapse defaultActiveKey={["query"]} items={items} />
    </div>
  );
}

export function SqlSampleAnswer() {
  const [sqlState, setSqlState] = useState<PanelState<SqlSampleResponse>>(idlePanelState);

  return (
    <AnswerCard
      endpoints={[{ method: "GET", path: "/sql-sample" }]}
      number={3}
      summary="Contoh skema SQLite, data awal, query JOIN, dan hasil baris."
      title="Join SQLite"
    >
      <Space className="answer-actions" wrap>
        <Button
          icon={<DatabaseOutlined />}
          loading={sqlState.loading}
          onClick={() => void runPanel(setSqlState, getSqlSample)}
          size="large"
          type="primary"
        >
          Muat Contoh SQL
        </Button>
      </Space>

      <div className="sql-stack">
        <SqlScriptPanel data={sqlState.data} />
        <Table
          bordered
          className="sql-table"
          columns={sqlColumns}
          dataSource={sqlState.data?.rows ?? []}
          loading={sqlState.loading}
          pagination={false}
          rowKey={(row) => `${row.user_id}-${row.company_id}`}
          scroll={{ x: 900 }}
          size="small"
        />
      </div>
    </AnswerCard>
  );
}
