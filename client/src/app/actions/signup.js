"use server";

import { signIn } from "@/app/actions/auth";
import { AuthError } from "next-auth";
import { SignupFormSchema } from "@/lib/definitions";

export async function signup(state, formData) {
  // 2. Validate fields locally first
  const validatedFields = SignupFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, firstName, lastName } = validatedFields.data;

  try {
    // STEP 1: Register the user (Standard fields only)
    const registerResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          email: email,
          password: password,
        }),
      },
    );

    const registerData = await registerResponse.json();

    if (!registerResponse.ok) {
      return { message: registerData.error.message || "Registration failed." };
    }

    // STEP 2: Update the profile with custom fields
    // We use the registerData.jwt to authorize this specific update
    const updateResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL}/api/users/${registerData.user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${registerData.jwt}`, // Use the new JWT
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      },
    );

    if (!updateResponse.ok) {
      console.error("Name update failed, but user was created.");
    }

    // STEP 3: Log in to NextAuth
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) return { message: "Login failed." };
    throw error;
  }
}
