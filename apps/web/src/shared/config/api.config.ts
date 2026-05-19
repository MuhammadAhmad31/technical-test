const getApiBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    throw new Error("Missing VITE_API_URL. Set it in apps/web/.env");
  }

  return apiUrl;
};

export const API_BASE_URL = getApiBaseUrl();
