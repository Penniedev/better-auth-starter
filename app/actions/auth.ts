"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function SignUpAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;


    await auth.api.signUpEmail({
        body: {
            email,
            password,
            name
        }
        
    });

    redirect("/login");
}
export async function SignInAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;


    await auth.api.signInEmail({
        body: {
            email,
            password,
        }
        
    });

    redirect("/");
}

export async function SignOutAction() {
    await auth.api.signOut({
        headers: await headers(),
    });

    redirect("/");
    
};