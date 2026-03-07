import axios from "axios";
import { normalizeApiError, unwrapApiResponse } from "../utils/apiResponse";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCurrentUser() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/user`);
    const data = unwrapApiResponse(response, "Unable to load user details.");
    return data;
  } catch (error) {
    throw normalizeApiError(error, "Unable to load user details.");
  }
}

export async function updateCurrentUser(userData) {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/user`, userData);
    const data = unwrapApiResponse(response, "Unable to update profile.");
    return data;
  } catch (error) {
    throw normalizeApiError(error, "Unable to update profile.");
  }
}

export async function changePassword(payload) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user`, payload);
    unwrapApiResponse(response, "Unable to change password.");
  } catch (error) {
    throw normalizeApiError(error, "Unable to change password.");
  }
}
