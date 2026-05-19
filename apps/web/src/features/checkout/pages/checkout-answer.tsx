import { CalculatorOutlined, PlayCircleOutlined } from "@ant-design/icons";
import type { CheckoutResponse } from "@repo/shared";
import { Button, InputNumber, Space } from "antd";
import { useState } from "react";
import { JsonPreview } from "../../../shared/components/json-preview";
import { AnswerCard } from "../../../shared/components/answer-card";
import { idlePanelState, runPanel, type PanelState } from "../../../shared/utils/panel-state";
import { calculateCheckout, getCheckoutSample } from "../api/checkout.api";

export function CheckoutAnswer() {
  const [checkoutInput, setCheckoutInput] = useState({
    pointPercentage: 2,
    price: 5_000_000,
    voucherPercentage: 50
  });
  const [checkoutState, setCheckoutState] = useState<PanelState<CheckoutResponse>>(idlePanelState);

  const updateCheckoutInput = (field: keyof typeof checkoutInput, value: number | null) => {
    setCheckoutInput((current) => ({
      ...current,
      [field]: value ?? 0
    }));
  };

  return (
    <AnswerCard
      endpoints={[
        { method: "GET", path: "/checkout/sample" },
        { method: "POST", path: "/checkout" }
      ]}
      number={1}
      summary="Perhitungan harga, voucher, total bayar, dan poin."
      title="Checkout"
    >
      <div className="answer-grid">
        <div className="control-panel">
          <div className="form-grid">
            <label>
              <span>Harga</span>
              <InputNumber
                min={0}
                onChange={(value) => updateCheckoutInput("price", value)}
                size="large"
                value={checkoutInput.price}
              />
            </label>
            <label>
              <span>Voucher (%)</span>
              <InputNumber
                min={0}
                onChange={(value) => updateCheckoutInput("voucherPercentage", value)}
                size="large"
                value={checkoutInput.voucherPercentage}
              />
            </label>
            <label>
              <span>Poin (%)</span>
              <InputNumber
                min={0}
                onChange={(value) => updateCheckoutInput("pointPercentage", value)}
                size="large"
                value={checkoutInput.pointPercentage}
              />
            </label>
          </div>

          <Space wrap>
            <Button
              icon={<PlayCircleOutlined />}
              loading={checkoutState.loading}
              onClick={() => void runPanel(setCheckoutState, getCheckoutSample)}
              size="large"
            >
              Jalankan Contoh
            </Button>
            <Button
              icon={<CalculatorOutlined />}
              loading={checkoutState.loading}
              onClick={() => void runPanel(setCheckoutState, () => calculateCheckout(checkoutInput))}
              size="large"
              type="primary"
            >
              Kirim Kustom
            </Button>
          </Space>
        </div>

        <JsonPreview
          error={checkoutState.error}
          loading={checkoutState.loading}
          placeholder="Klik Jalankan Contoh atau Kirim Kustom untuk melihat respons checkout."
          value={checkoutState.data}
        />
      </div>
    </AnswerCard>
  );
}
