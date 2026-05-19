import { LoginOutlined, LogoutOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Alert, Button, Input, Space } from "antd";
import { useState } from "react";
import {
  getCurrentSession,
  logout,
  mockOAuthLogin,
  type AuthResponse,
  type MessageResponse
} from "../api/auth.api";
import { JsonPreview } from "../../../shared/components/json-preview";
import { AnswerCard } from "../../../shared/components/answer-card";
import { idlePanelState, runPanel, type PanelState } from "../../../shared/utils/panel-state";

type AuthPanelData = AuthResponse | { context: AuthResponse["context"] } | MessageResponse;

export function AuthAnswer() {
  const [authUsername, setAuthUsername] = useState("demo");
  const [authState, setAuthState] = useState<PanelState<AuthPanelData>>(idlePanelState);

  const uniqueUsername = `${authUsername.trim() || "demo"}_${Date.now()}`;

  return (
    <AnswerCard
      endpoints={[
        { method: "POST", path: "/auth/oauth/mock-login" },
        { method: "GET", path: "/auth/me" },
        { method: "POST", path: "/auth/logout" }
      ]}
      number={2}
      summary="Mock OAuth, cookie JWT httpOnly, cek sesi, dan keluar."
      title="Autentikasi OAuth + Cookie JWT"
    >
      <div className="answer-grid">
        <div className="control-panel">
          <label>
            <span>Awalan nama pengguna</span>
            <Input
              onChange={(event) => setAuthUsername(event.target.value)}
              size="large"
              value={authUsername}
            />
          </label>

          <Alert
            description={
              <>
                Setelah klik Login Mock, backend menyimpan JWT ke cookie <code>access_token</code>.
                Cookie ini httpOnly, jadi tidak dibaca JavaScript, tapi bisa dicek di DevTools,
                Application, Cookies.
              </>
            }
            message="Token login tersimpan di cookie"
            showIcon
            type="info"
          />

          <Space wrap>
            <Button
              icon={<LoginOutlined />}
              loading={authState.loading}
              onClick={() =>
                void runPanel<AuthPanelData>(setAuthState, () => mockOAuthLogin(uniqueUsername))
              }
              size="large"
              type="primary"
            >
              Login Mock
            </Button>
            <Button
              icon={<UserSwitchOutlined />}
              loading={authState.loading}
              onClick={() => void runPanel<AuthPanelData>(setAuthState, getCurrentSession)}
              size="large"
            >
              Cek Sesi
            </Button>
            <Button
              danger
              icon={<LogoutOutlined />}
              loading={authState.loading}
              onClick={() => void runPanel<AuthPanelData>(setAuthState, logout)}
              size="large"
            >
              Keluar
            </Button>
          </Space>
        </div>

        <JsonPreview
          error={authState.error}
          loading={authState.loading}
          placeholder="Klik Login Mock, Cek Sesi, atau Keluar untuk melihat respons autentikasi."
          value={authState.data}
        />
      </div>
    </AnswerCard>
  );
}
