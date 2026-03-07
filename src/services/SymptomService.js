import axios from "axios";
import { normalizeApiError, unwrapApiResponse } from "../utils/apiResponse";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchSymptoms() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/symptoms`);
    const data = unwrapApiResponse(response, "Unable to load symptoms.");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw normalizeApiError(error, "Unable to load symptoms.");
  }
}
