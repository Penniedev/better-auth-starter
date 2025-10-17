"use client";

import { signIn, signUp, signOut } from "@/lib/auth-client";
import { useAuth } from "@/components/provider/auth-provider";
import { useState } from "react";

export function useAuthActions() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signIn.email({
        email,
        password,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    name: string
  ) => {
    setIsLoading(true);
    try {
      await signUp.email({
        email,
        password,
        name,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    isLoading,
  };
}

export { useAuth };
