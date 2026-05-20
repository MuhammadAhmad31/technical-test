import { GithubOutlined } from "@ant-design/icons";
import { Button, Tabs, Typography, type TabsProps } from "antd";
import { ArrayManipulationAnswer } from "../../array-manipulation/pages/array-manipulation-answer";
import { AuthAnswer } from "../../auth/pages/auth-answer";
import { CheckoutAnswer } from "../../checkout/pages/checkout-answer";
import { RandomUserAnswer } from "../../random-user/pages/random-user-answer";
import { SqlSampleAnswer } from "../../sql-sample/pages/sql-sample-answer";

const { Text, Title } = Typography;

const repositoryUrl = "https://github.com/MuhammadAhmad31/technical-test.git";

const answerTabs: TabsProps["items"] = [
  {
    key: "checkout",
    label: "1. Checkout",
    children: <CheckoutAnswer />
  },
  {
    key: "auth",
    label: "2. Autentikasi",
    children: <AuthAnswer />
  },
  {
    key: "sql",
    label: "3. SQLite",
    children: <SqlSampleAnswer />
  },
  {
    key: "random-user",
    label: "4. RandomUser",
    children: <RandomUserAnswer />
  },
  {
    key: "array",
    label: "5. Manipulasi Array",
    children: <ArrayManipulationAnswer />
  }
];

export function TechnicalTestPage() {
  return (
    <main className="app-shell technical-test-shell">
      <section className="technical-test-header">
        <div>
          <Text className="technical-test-eyebrow">Tes Teknis App Dev</Text>
          <Title className="technical-test-title" level={2}>
            Dashboard Jawaban
          </Title>
        </div>

        <Button
          className="repository-link"
          href={repositoryUrl}
          icon={<GithubOutlined />}
          rel="noreferrer"
          target="_blank"
        >
          GitHub Repository
        </Button>
      </section>

      <Tabs className="answer-tabs" defaultActiveKey="checkout" items={answerTabs} />
    </main>
  );
}
