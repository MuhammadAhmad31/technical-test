import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const host = env.WEB_HOST ?? "0.0.0.0";

  return {
    plugins: [react()],
    server: {
      host,
      port: Number(env.WEB_PORT ?? 5173),
      strictPort: true
    },
    preview: {
      host,
      port: Number(env.WEB_PREVIEW_PORT ?? 4173),
      strictPort: true
    }
  };
});
