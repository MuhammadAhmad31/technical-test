import { CalculatorOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useState } from "react";
import {
  getArraySample,
  manipulateArray,
  type ArrayManipulationResponse
} from "../api/array-manipulation.api";
import { JsonPreview } from "../../../shared/components/json-preview";
import { AnswerCard } from "../../../shared/components/answer-card";
import { idlePanelState, runPanel, type PanelState } from "../../../shared/utils/panel-state";
import { csvToArray } from "../utils/csv";

export function ArrayManipulationAnswer() {
  const [arrayInput, setArrayInput] = useState({
    colors: "merah, kuning, hijau, pink, ungu, maroon",
    products: "baju, celana, topi, jaket, sepatu",
    promos: "Diskon, Sale, Diskon, Sale, Sale"
  });
  const [arrayState, setArrayState] =
    useState<PanelState<ArrayManipulationResponse>>(idlePanelState);

  const runCustomArray = () =>
    runPanel(setArrayState, () =>
      manipulateArray({
        colors: csvToArray(arrayInput.colors),
        products: csvToArray(arrayInput.products),
        promos: csvToArray(arrayInput.promos)
      })
    );

  return (
    <AnswerCard
      endpoints={[
        { method: "GET", path: "/array-manipulation/sample" },
        { method: "POST", path: "/array-manipulation" }
      ]}
      number={5}
      summary="Manipulasi array warna, produk, promo, termasuk input kustom."
      title="Manipulasi Array"
    >
      <div className="answer-grid">
        <div className="control-panel">
          <label>
            <span>Warna</span>
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 4 }}
              onChange={(event) =>
                setArrayInput((current) => ({ ...current, colors: event.target.value }))
              }
              value={arrayInput.colors}
            />
          </label>
          <label>
            <span>Produk</span>
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 4 }}
              onChange={(event) =>
                setArrayInput((current) => ({ ...current, products: event.target.value }))
              }
              value={arrayInput.products}
            />
          </label>
          <label>
            <span>Promo</span>
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 4 }}
              onChange={(event) =>
                setArrayInput((current) => ({ ...current, promos: event.target.value }))
              }
              value={arrayInput.promos}
            />
          </label>

          <Space wrap>
            <Button
              icon={<PlayCircleOutlined />}
              loading={arrayState.loading}
              onClick={() => void runPanel(setArrayState, getArraySample)}
              size="large"
            >
              Jalankan Contoh
            </Button>
            <Button
              icon={<CalculatorOutlined />}
              loading={arrayState.loading}
              onClick={() => void runCustomArray()}
              size="large"
              type="primary"
            >
              Kirim Kustom
            </Button>
          </Space>
        </div>

        <JsonPreview
          error={arrayState.error}
          loading={arrayState.loading}
          placeholder="Klik Jalankan Contoh atau Kirim Kustom untuk melihat respons manipulasi array."
          value={arrayState.data}
        />
      </div>
    </AnswerCard>
  );
}
