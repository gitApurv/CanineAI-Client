export const AUTH_SESSION_INVALIDATED = "canineai-auth-session-invalidated";

export function notifyAuthSessionInvalidated() {
  window.dispatchEvent(new Event(AUTH_SESSION_INVALIDATED));
}