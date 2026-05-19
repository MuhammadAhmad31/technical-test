import { Image, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { RandomUserTableRow } from "../types/random-user.types";

const columns: ColumnsType<RandomUserTableRow> = [
  {
    title: "Nama",
    dataIndex: "name",
    width: 205
  },
  {
    title: "Umur",
    dataIndex: "age",
    width: 110
  },
  {
    title: "Alamat",
    dataIndex: "location",
    width: 160
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 170
  },
  {
    title: "No. Telepon 1",
    dataIndex: "phone",
    width: 155
  },
  {
    title: "No. Telepon 2",
    dataIndex: "cell",
    width: 155
  },
  {
    title: "Gambar",
    dataIndex: "picture",
    width: 155,
    render: (picture: string[], record) => (
      <Image
        alt={record.name}
        className="random-user-image"
        preview={false}
        src={picture[0]}
      />
    )
  }
];

type RandomUserTableProps = {
  loading: boolean;
  users: RandomUserTableRow[];
};

export function RandomUserTable({ loading, users }: RandomUserTableProps) {
  return (
    <Table
      className="random-user-table"
      columns={columns}
      dataSource={users}
      loading={loading}
      pagination={false}
      scroll={{ x: 1110 }}
    />
  );
}
