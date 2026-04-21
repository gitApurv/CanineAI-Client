import { createContext, useContext, useEffect, useMemo, useState } from "react";
import httpClient from "../services/httpClient";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await httpClient.get("/api/user/logged-in");
        if (response.data?.data === true) {
          setIsUserLoggedIn(true);
        } else {
          setIsUserLoggedIn(false);
        }
      } catch {
        setIsUserLoggedIn(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateSession();
  }, []);

  const value = useMemo(
    () => ({
      isUserLoggedIn,
      setIsUserLoggedIn,
      isValidating,
    }),
    [isUserLoggedIn, isValidating],
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
