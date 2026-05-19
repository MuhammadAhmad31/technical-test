import type { Dispatch, SetStateAction } from "react";

export type PanelState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export function idlePanelState<T>(): PanelState<T> {
  return {
    data: null,
    error: null,
    loading: false
  };
}

export async function runPanel<T>(
  setState: Dispatch<SetStateAction<PanelState<T>>>,
  request: () => Promise<T>
) {
  setState((current) => ({
    ...current,
    error: null,
    loading: true
  }));

  try {
    const data = await request();
    setState({
      data,
      error: null,
      loading: false
    });
  } catch (error) {
    setState((current) => ({
      ...current,
      error: error instanceof Error ? error.message : "Request gagal",
      loading: false
    }));
  }
}
