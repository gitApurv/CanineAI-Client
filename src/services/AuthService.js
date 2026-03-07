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
  name,
  email,
  password,
  profilePictureUrl,
}) {
  const payload = {
    name,
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

export async function forgotPassword({ email }) {
  return postAuth("/forgot-password", { email });
}

export async function resetPassword({ token, email, password }) {
  return postAuth("/reset-password", {
    token,
    email,
    password,
  });
}
