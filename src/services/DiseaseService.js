import axios from "axios";
import { normalizeApiError, unwrapApiResponse } from "../utils/apiResponse";

export async function fetchDiseases() {
  try {
    const response = await axios.get("/api/diseases");
    const data = unwrapApiResponse(response, "Unable to load diseases.");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw normalizeApiError(error, "Unable to load diseases.");
  }
}

export async function fetchDiseaseById(diseaseId) {
  try {
    const response = await axios.get(`/api/diseases/${diseaseId}`);
    return unwrapApiResponse(response, "Unable to load disease detail.");
  } catch (error) {
    throw normalizeApiError(error, "Unable to load disease detail.");
  }
}
