import { ConfigProvider } from "antd";
import { TechnicalTestPage } from "../features/technical-test/pages/technical-test-page";

export function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 8,
          colorPrimary: "#2563eb",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
        }
      }}
    >
      <TechnicalTestPage />
    </ConfigProvider>
  );
}
