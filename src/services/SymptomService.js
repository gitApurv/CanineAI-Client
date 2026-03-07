import axios from "axios";
import { normalizeApiError, unwrapApiResponse } from "../utils/apiResponse";

export async function fetchSymptoms() {
  try {
    const response = await axios.get(`/api/symptoms`);
    const data = unwrapApiResponse(response, "Unable to load symptoms.");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw normalizeApiError(error, "Unable to load symptoms.");
  }
}
