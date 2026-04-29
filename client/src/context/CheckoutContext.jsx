"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CheckoutContext = createContext(null);

export const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState({
    email: "",
    emailOptIn: false,
    shippingAddress: {},
    shippingMethod: null,
    billingAddress: {},
    paymentMethod: null,
  });

  // Persist to sessionStorage so refresh doesn't kill it
  useEffect(() => {
    const saved = sessionStorage.getItem("checkout");
    if (saved) setCheckoutData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("checkout", JSON.stringify(checkoutData));
  }, [checkoutData]);

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
