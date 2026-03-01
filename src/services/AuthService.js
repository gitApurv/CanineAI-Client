import axios from "axios";
import { normalizeApiError, unwrapApiResponse } from "../utils/apiResponse";

const AUTH_BASE_URL = "/api/auth";

async function getAuth(path) {
  try {
    const response = await axios.get(`${AUTH_BASE_URL}${path}`);
    return unwrapApiResponse(response);
  } catch (error) {
    throw normalizeApiError(error);
  }
}

async function postAuth(path, payload = {}) {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}${path}`, payload);
    return unwrapApiResponse(response);
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function registerUser({
  fullName,
  email,
  password,
  profilePictureUrl,
}) {
  const payload = {
    fullName,
    email,
    password,
  };

  if (profilePictureUrl) {
    payload.profilePictureUrl = profilePictureUrl;
  }

  return postAuth("/register", {
    ...payload,
  });
}

export async function loginUser({ email, password }) {
  return postAuth("/login", { email, password });
}

export async function logoutUser(payload = {}) {
  return getAuth("/logout");
}

export async function requestPasswordReset({ email }) {
  return postAuth("/forgot-password", { email });
}

export async function resetPassword({ token, password, confirmPassword }) {
  return postAuth("/reset-password", {
    token,
    password,
    confirmPassword,
  });
}

export async function changePassword({
  currentPassword,
  newPassword,
  confirmPassword,
}) {
  return postAuth("/change-password", {
    currentPassword,
    newPassword,
    confirmPassword,
  });
}
