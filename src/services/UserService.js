import axios from "axios";
import { normalizeApiError, unwrapApiResponse } from "../utils/apiResponse";

export async function getCurrentUser() {
  try {
    const response = await axios.get("/api/user");
    const data = unwrapApiResponse(response, "Unable to load user details.");
    return data;
  } catch (error) {
    throw normalizeApiError(error, "Unable to load user details.");
  }
}
