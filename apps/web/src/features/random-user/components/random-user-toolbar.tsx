import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

type RandomUserToolbarProps = {
  loading: boolean;
  query: string;
  onAddData: () => void;
  onQueryChange: (query: string) => void;
};

export function RandomUserToolbar({
  loading,
  query,
  onAddData,
  onQueryChange
}: RandomUserToolbarProps) {
  return (
    <div className="random-user-toolbar">
      <div className="random-user-search">
        <Input
          allowClear
          className="random-user-search-input"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search"
          value={query}
        />
        <Button
          aria-label="Cari"
          className="random-user-search-button"
          icon={<SearchOutlined />}
          onClick={() => onQueryChange(query)}
        />
      </div>
      <Button
        className="random-user-add-button"
        icon={<PlusOutlined />}
        loading={loading}
        onClick={onAddData}
        size="large"
      >
        New Data
      </Button>
    </div>
  );
}
