import httpClient from "./httpClient";
import { normalizeApiError, unwrapApiResponse } from "../utils/apiResponse";

export async function getCurrentUser() {
  try {
    const response = await httpClient.get(`/api/user`);
    const data = unwrapApiResponse(response, "Unable to load user details.");
    return data;
  } catch (error) {
    throw normalizeApiError(error, "Unable to load user details.");
  }
}

export async function updateCurrentUser(userData) {
  try {
    const response = await httpClient.put(`/api/user`, userData);
    const data = unwrapApiResponse(response, "Unable to update profile.");
    return data;
  } catch (error) {
    throw normalizeApiError(error, "Unable to update profile.");
  }
}

export async function changePassword(payload) {
  try {
    const response = await httpClient.post(`/api/user`, payload);
    unwrapApiResponse(response, "Unable to change password.");
  } catch (error) {
    throw normalizeApiError(error, "Unable to change password.");
  }
}
