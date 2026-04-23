"use server";

import { signIn } from "@/app/actions/auth";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/lib/definitions";

export async function login(prevState, formData) {
  // 2. Validate fields locally first
  const validatedFields = LoginSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    // This triggers the 'authorize' callback in your auth.js
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/", // Where to go after success
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid email or password." };
        default:
          return { message: "Something went wrong. Please try again." };
      }
    }
    // IMPORTANT: You must re-throw the error so Next.js can handle the redirect
    throw error;
  }
}
