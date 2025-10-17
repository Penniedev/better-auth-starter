import { createAuthClient } from "better-auth/react";
import type { User, Session } from "./auth-types";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  if (process.env.PROVIDER_URL) {
    return process.env.PROVIDER_URL;
  }
  return "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  requestPasswordReset,
  resetPassword,
} = authClient;

export type { User, Session };
