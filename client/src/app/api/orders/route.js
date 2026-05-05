import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();

    try {
        const res = await fetch(`/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}` // Server-side only
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const error = await res.json();
            return NextResponse.json({ error: error.error.message }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}