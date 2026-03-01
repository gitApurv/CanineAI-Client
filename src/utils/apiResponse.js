export function unwrapApiResponse(
  response,
  fallbackMessage = "Request failed.",
) {
  const payload = response?.data ?? {};
  const { status, message, data } = payload;

  if (status === "success") {
    return data;
  }

  if (status === "error") {
    throw new Error(message || fallbackMessage);
  }

  return payload;
}

export function normalizeApiError(error, fallbackMessage = "Request failed.") {
  const apiMessage = error?.response?.data?.message;
  if (apiMessage) {
    return new Error(apiMessage);
  }

  if (error instanceof Error && error.message) {
    return error;
  }

  return new Error(fallbackMessage);
}
