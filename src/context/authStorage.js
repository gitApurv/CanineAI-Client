const AUTH_STORAGE_KEY = "canineai_is_user_logged_in";

function safeStorageAction(action) {
  try {
    return action();
  } catch (error) {
    console.warn("Failed to access auth state in localStorage:", error);
    return null;
  }
}

export function readStoredAuthState() {
  return (
    safeStorageAction(() => localStorage.getItem(AUTH_STORAGE_KEY) === "true") ??
    false
  );
}

export function setStoredAuthState(isUserLoggedIn) {
  return safeStorageAction(() => {
    if (isUserLoggedIn) {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  });
}

export function clearStoredAuthState() {
  return safeStorageAction(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  });
}