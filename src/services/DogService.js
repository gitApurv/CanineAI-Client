import httpClient from "./httpClient";
import { normalizeApiError, unwrapApiResponse } from "../utils/apiResponse";

export async function fetchDogsCount() {
  try {
    const response = await httpClient.get(`/api/dog/count`);
    return unwrapApiResponse(response, "Unable to fetch dogs count.");
  } catch (error) {
    throw normalizeApiError(error, "Unable to fetch dogs count.");
  }
}

export async function fetchDogs() {
  try {
    const response = await httpClient.get(`/api/dog`);
    const data = unwrapApiResponse(response, "Unable to load dogs.");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw normalizeApiError(error, "Unable to load dogs.");
  }
}

export async function fetchDogById(dogId) {
  try {
    const response = await httpClient.get(`/api/dog/${dogId}`);
    return unwrapApiResponse(response, "Unable to load dog detail.");
  } catch (error) {
    throw normalizeApiError(error, "Unable to load dog detail.");
  }
}

export async function createDog(dogData) {
  try {
    const response = await httpClient.post(`/api/dog`, dogData);
    return unwrapApiResponse(response, "Unable to create dog.");
  } catch (error) {
    throw normalizeApiError(error, "Unable to create dog.");
  }
}

export async function updateDog(dogId, dogData) {
  try {
    const response = await httpClient.put(`/api/dog/${dogId}`, dogData);
    return unwrapApiResponse(response, "Unable to update dog.");
  } catch (error) {
    throw normalizeApiError(error, "Unable to update dog.");
  }
}

export async function deleteDog(dogId) {
  try {
    const response = await httpClient.delete(`/api/dog/${dogId}`);
    return unwrapApiResponse(response, "Unable to delete dog.");
  } catch (error) {
    throw normalizeApiError(error, "Unable to delete dog.");
  }
}
