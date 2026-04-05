import axios from "axios";
import { clearStoredAuthState } from "../context/authStorage";
import { notifyAuthSessionInvalidated } from "../context/authEvents";

const configuredBaseUrl = String(
  import.meta.env.VITE_API_BASE_URL || "",
).trim();

const httpClient = axios.create({
  baseURL: configuredBaseUrl || undefined,
  withCredentials: true,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      clearStoredAuthState();
      notifyAuthSessionInvalidated();
    }

    return Promise.reject(error);
  },
);

export default httpClient;
