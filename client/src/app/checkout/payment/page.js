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
    // 1. Fetch page labels from Strapi
    // fetch("/api/checkout-page?populate=deep")
    //   .then((res) => res.json())
    //   .then((data) => setPageData(data?.data?.attributes));

    // 2. Create PaymentIntent and get clientSecret
    if (total > 0) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(total * 100), // cents
          currency: "usd",
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [total]);

  if (!clientSecret) {
    return <div className="p-5">Loading payment...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div>
        <PaymentForm />
      </div>
    </Elements>
  );
};

export default page;
