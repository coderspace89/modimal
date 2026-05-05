import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, currency, metadata } = await req.json();

    console.log("Creating PI with amount:", amount); // Add this

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY missing");
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 500 },
      );
    }

    if (!amount || amount < 50) {
      console.error("Invalid amount:", amount);
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Ensure integer
      currency: currency || "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        email: metadata?.email || "",
        // Don't stringify large objects - Stripe limit is 500 chars per value
        subtotal: metadata?.subtotal?.toString() || "0",
        tax: metadata?.tax?.toString() || "0",
        shipping: metadata?.shipping?.toString() || "0",
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err.message); // This will show in terminal
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
