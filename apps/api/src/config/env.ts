const getOptionalEnv = (key: string) => process.env[key]?.trim();

export const getEnv = (key: string, fallback: string) => getOptionalEnv(key) || fallback;

export const getNumberEnv = (key: string, fallback: number) => {
  const value = Number(getOptionalEnv(key));
  return Number.isFinite(value) ? value : fallback;
};

export const getBooleanEnv = (key: string, fallback: boolean) => {
  const value = getOptionalEnv(key)?.toLowerCase();

  if (value === "true") return true;
  if (value === "false") return false;

  return fallback;
};

export const getCsvEnv = (key: string, fallback: string[]) => {
  const value = getOptionalEnv(key);

  if (!value) {
    return fallback;
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};
