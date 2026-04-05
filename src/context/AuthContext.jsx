import { useEffect, useMemo, useState } from "react";
import AuthContext from "./authContext";
import { AUTH_SESSION_INVALIDATED } from "./authEvents";
import {
  clearStoredAuthState,
  readStoredAuthState,
  setStoredAuthState,
} from "./authStorage";
import { getCurrentUser } from "../services/UserService";

function isAuthSessionInvalid(error) {
  const status = error?.response?.status;

  if (status === 401 || status === 403) {
    return true;
  }

  const message = String(error?.message || "").toLowerCase();
  return message.includes("unauthorized") || message.includes("unauthenticated");
}

export function AuthProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(readStoredAuthState);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    setStoredAuthState(isUserLoggedIn);
  }, [isUserLoggedIn]);

  useEffect(() => {
    let isCancelled = false;

    const handleAuthSessionInvalidated = () => {
      if (isCancelled) {
        return;
      }

      setIsUserLoggedIn(false);
      setIsAuthChecked(true);
    };

    const verifySession = async () => {
      if (!readStoredAuthState()) {
        setIsUserLoggedIn(false);
        setIsAuthChecked(true);
        return;
      }

      try {
        await getCurrentUser();

        if (!isCancelled) {
          setIsUserLoggedIn(true);
        }
      } catch (error) {
        if (isAuthSessionInvalid(error)) {
          clearStoredAuthState();

          if (!isCancelled) {
            setIsUserLoggedIn(false);
          }
        }
      } finally {
        if (!isCancelled) {
          setIsAuthChecked(true);
        }
      }
    };

    verifySession();

    window.addEventListener(
      AUTH_SESSION_INVALIDATED,
      handleAuthSessionInvalidated,
    );

    return () => {
      isCancelled = true;
      window.removeEventListener(
        AUTH_SESSION_INVALIDATED,
        handleAuthSessionInvalidated,
      );
    };
  }, []);

  const value = useMemo(
    () => ({
      isUserLoggedIn,
      setIsUserLoggedIn,
      isAuthChecked,
    }),
    [isAuthChecked, isUserLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
