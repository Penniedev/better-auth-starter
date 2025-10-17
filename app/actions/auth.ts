"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function SignUpAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    await auth.api.signUpEmail({
      body: { email, password, name },
      headers: await headers(),
    });

    redirect("/login");
  } catch (error) {
    console.error("Sign up error:", error);
    redirect("/signup?error=signup-failed");
  }
}
export async function SignInAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    redirect("/");
  } catch (error) {
    console.error("Sign in error:", error);
    redirect("/signin?error=signin-failed");
  }
}

export async function SignOutAction() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    redirect("/");
  } catch (error) {
    console.error("Signout error:", error);
  }
}
