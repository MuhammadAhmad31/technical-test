import { Alert, Skeleton } from "antd";

type JsonPreviewProps = {
  error: string | null;
  loading: boolean;
  placeholder: string;
  value: unknown;
};

export function JsonPreview({ error, loading, placeholder, value }: JsonPreviewProps) {
  if (loading && value === null) {
    return (
      <div className="json-preview">
        <Skeleton active paragraph={{ rows: 4 }} title={false} />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} showIcon type="error" />;
  }

  return (
    <pre className="json-preview">
      {value === null || value === undefined ? placeholder : JSON.stringify(value, null, 2)}
    </pre>
  );
}
