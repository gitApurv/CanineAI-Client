import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(undefined);
const AUTH_STORAGE_KEY = "canineai_is_user_logged_in";

function readStoredAuthState() {
  try {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  } catch (error) {
    console.warn("Failed to read auth state from localStorage:", error);
    return false;
  }
}

export function AuthProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(readStoredAuthState);

  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, String(isUserLoggedIn));
    } catch (error) {
      console.warn("Failed to persist auth state to localStorage:", error);
    }
  }, [isUserLoggedIn]);

  const value = useMemo(
    () => ({
      isUserLoggedIn,
      setIsUserLoggedIn,
    }),
    [isUserLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
