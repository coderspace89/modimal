import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  // At the top of your function, dynamically pick the correct backend URL
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_CLOUD_URL ||
    process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL;

  try {
    const res = await fetch(`${strapiUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error?.message || "Failed to send");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
