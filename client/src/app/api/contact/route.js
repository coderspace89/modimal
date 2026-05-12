import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error?.message || 'Failed to send');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}