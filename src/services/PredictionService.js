import httpClient from "./httpClient";
import { unwrapApiResponse, normalizeApiError } from "../utils/apiResponse";

export async function fetchPredictionsCount() {
  try {
    const response = await httpClient.get(`/api/predict/count`);
    const data = unwrapApiResponse(
      response,
      "Unable to fetch predictions count.",
    );
    return data;
  } catch (error) {
    throw normalizeApiError(error, "Unable to fetch predictions count.");
  }
}

export async function fetchLatestPrediction() {
  try {
    const response = await httpClient.get(`/api/predict/latest`);
    const data = unwrapApiResponse(
      response,
      "Unable to fetch latest prediction.",
    );
    return data;
  } catch (error) {
    throw normalizeApiError(error, "Unable to fetch latest prediction.");
  }
}

export async function predictDisease(predictionRequestData) {
  try {
    const response = await httpClient.post(
      `/api/predict`,
      predictionRequestData,
    );
    const data = unwrapApiResponse(response, "Unable to predict disease.");
    return data;
  } catch (error) {
    throw normalizeApiError(error, "Unable to predict disease.");
  }
}

export async function fetchPredictionById(predictionId) {
  try {
    const response = await httpClient.get(`/api/predict/${predictionId}`);
    const data = unwrapApiResponse(response, "Unable to fetch prediction.");
    return data;
  } catch (error) {
    throw normalizeApiError(error, "Unable to fetch prediction.");
  }
}

export async function fetchTop3PredictionHistory() {
  try {
    const response = await httpClient.get(`/api/predict/top3`);
    const data = unwrapApiResponse(
      response,
      "Unable to fetch top 3 prediction history.",
    );
    return data;
  } catch (error) {
    throw normalizeApiError(error, "Unable to fetch top 3 prediction history.");
  }
}

export async function fetchPredictionHistory() {
  try {
    const response = await httpClient.get(`/api/predict`);
    const data = unwrapApiResponse(
      response,
      "Unable to fetch prediction history.",
    );
    return data;
  } catch (error) {
    throw normalizeApiError(error, "Unable to fetch prediction history.");
  }
}

export async function fetchPredictionsByDogId(dogId) {
  try {
    const response = await httpClient.get(`/api/predict/dog/${dogId}`);
    const data = unwrapApiResponse(
      response,
      "Unable to fetch dog prediction history.",
    );
    return data;
  } catch (error) {
    throw normalizeApiError(error, "Unable to fetch dog prediction history.");
  }
}
