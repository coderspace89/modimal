import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  console.log("Posting to Strapi:", JSON.stringify(body, null, 2));

  // At the top of your function, dynamically pick the correct backend URL
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_CLOUD_URL ||
    process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL;

  try {
    // Use full URL to Strapi, not relative /api/orders
    const res = await fetch(`${strapiUrl}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Strapi validation error:", JSON.stringify(data, null, 2));
      return NextResponse.json(
        {
          error: data.error?.message || "Failed to create order",
          details: data.error?.details,
        },
        { status: res.status },
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
