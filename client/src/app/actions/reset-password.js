"use server";
import { redirect } from "next/navigation";

export async function resetPassword(formData) {
  const password = formData.get("password");
  const passwordConfirmation = formData.get("passwordConfirmation");
  const code = formData.get("code"); // The token from the URL

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL}/api/auth/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          password,
          passwordConfirmation,
        }),
      },
    );

    if (res.ok) {
      // Take them to login so they can try their new password
      redirect("/login?reset=success");
    } else {
      const error = await res.json();
      return { error: error.error.message };
    }
  } catch (err) {
    return { message: "Failed to reset password." };
  }
}
