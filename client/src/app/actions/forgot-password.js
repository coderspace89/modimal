"use server";

export async function forgotPassword(formData) {
  const email = formData.get("email");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      },
    );

    if (!res.ok) {
      const error = await res.json();
      return { message: error.error.message || "Something went wrong" };
    }

    return { success: true, message: "Check your email for a reset link!" };
  } catch (err) {
    return { message: "Network error. Please try again." };
  }
}
