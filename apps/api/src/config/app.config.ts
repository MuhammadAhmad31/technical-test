import { getCsvEnv, getEnv, getNumberEnv } from "./env.js";

export const appConfig = {
  apiPrefix: getEnv("API_PREFIX", "api"),
  corsOrigins: getCsvEnv("CORS_ORIGINS", [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173"
  ]),
  port: getNumberEnv("API_PORT", 3000)
};
