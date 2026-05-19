import { getEnv } from "./env.js";

export const randomUserConfig = {
  apiSeed: getEnv("RANDOM_USER_API_SEED", "technical-test"),
  apiUrl: getEnv("RANDOM_USER_API_URL", "https://randomuser.me/api/")
};
