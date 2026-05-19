import { Tag, Typography } from "antd";
import type { ReactNode } from "react";

const { Text, Title } = Typography;

type Endpoint = {
  method: "GET" | "POST";
  path: string;
};

type AnswerCardProps = {
  children: ReactNode;
  endpoints: Endpoint[];
  hideHeader?: boolean;
  number: number;
  summary: string;
  title: string;
};

const methodColor: Record<Endpoint["method"], string> = {
  GET: "blue",
  POST: "green"
};

export function AnswerCard({
  children,
  endpoints,
  hideHeader = false,
  number,
  summary,
  title
}: AnswerCardProps) {
  return (
    <section className="answer-card" id={`answer-${number}`}>
      {!hideHeader && (
        <div className="answer-card-header">
          <div>
            <Text className="answer-label">Jawaban {number}</Text>
            <Title className="answer-title" level={4}>
              {title}
            </Title>
            <Text className="answer-summary">{summary}</Text>
          </div>

          <div className="endpoint-tags">
            {endpoints.map((endpoint) => (
              <Tag color={methodColor[endpoint.method]} key={`${endpoint.method}-${endpoint.path}`}>
                {endpoint.method} {endpoint.path}
              </Tag>
            ))}
          </div>
        </div>
      )}

      <div className="answer-card-body">{children}</div>
    </section>
  );
}
