"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { loginSchema } from "@/schemas/auth-schema";
import { type ActionResponse } from "@/types";

export async function loginAction(
  formData: unknown
): Promise<ActionResponse> {
  try {
    const validated = loginSchema.safeParse(formData);
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.issues[0]?.message || "Invalid input",
      };
    }

    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirectTo: "/admin",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid email or password" };
        default:
          return { success: false, error: "Authentication error occurred" };
      }
    }
    // Auth.js throws a NEXT_REDIRECT error on successful login redirect
    throw error;
  }
}

export async function logoutAction(): Promise<void> {
  await signOut({ redirectTo: "/admin/login" });
}
