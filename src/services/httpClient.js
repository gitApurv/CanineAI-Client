import axios from "axios";

const configuredBaseUrl = String(
  import.meta.env.VITE_API_BASE_URL || "",
).trim();

const httpClient = axios.create({
  baseURL: configuredBaseUrl || undefined,
  withCredentials: true,
});

export default httpClient;
