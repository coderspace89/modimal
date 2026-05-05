"use client";

import React, { useState, useEffect } from "react";
import PaymentForm from "@/app/components/pages/checkout/payment/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

const page = () => {
  const { total } = useCart();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent only once
    if (total > 0 && !clientSecret) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: "usd",
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [total, clientSecret]); // Only run if clientSecret doesn't exist

  if (!clientSecret) return <div className="p-5">Loading payment...</div>;

  // Stripe form styles
  const appearance = {
    theme: "none",
    variables: {
      fontFamily: "system-ui",
      fontSizeBase: "16px",
      borderRadius: "0.375rem", // Bootstrap .form-control radius
    },
    rules: {
      ".Input": {
        border: "1px solid #dee2e6", // Bootstrap border
        padding: "0.375rem 0.75rem", // Bootstrap padding
        lineHeight: "1.5",
      },
      ".Input:focus": {
        borderColor: "#86b7fe", // Bootstrap focus
        boxShadow: "0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
      },
      ".Label": {
        marginBottom: "0.5rem",
        fontWeight: "400",
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <div>
        <PaymentForm />
      </div>
    </Elements>
  );
};

export default page;
