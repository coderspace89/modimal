"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [taxConfig, setTaxConfig] = useState(null);
  const [shippingRegion, setShippingRegion] = useState("DEFAULT"); // PK-SD, US-CA, etc

  // Load cart + tax config
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setItems(JSON.parse(saved));

    // Fetch tax config once
    const fetchTax = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL}/api/tax-config`,
        );
        const data = await res.json();
        setTaxConfig(data?.data || { defaultTaxRate: 0.08 });
      } catch (e) {
        console.error("Tax config failed, using 8%", e);
        setTaxConfig({ defaultTaxRate: 0.08 });
      }
    };
    fetchTax();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const getTaxRate = () => {
    if (!taxConfig) return 0.08;
    return taxConfig.regionRates?.[shippingRegion] || taxConfig.defaultTaxRate;
  };

  const getShippingCost = (subtotal) => {
    if (!taxConfig) return 0;
    if (
      subtotal >= taxConfig.shippingThreshold &&
      taxConfig.shippingThreshold > 0
    )
      return 0;
    return subtotal > 0 ? taxConfig.shippingFlatRate : 0;
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const taxRate = getTaxRate();
  const tax = subtotal * taxRate;
  const shipping = getShippingCost(subtotal);
  const total = subtotal + tax + shipping;

  const addItem = (product, size, color, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.productId === product.id &&
          i.sizeId === size.id &&
          i.colorId === color.id,
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}-${size.id}-${color.id}`,
          productId: product.id,
          product: product,
          sizeId: size.id,
          size: size,
          colorId: color.id,
          color: color,
          quantity,
          price: product.price,
        },
      ];
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return removeItem(itemId);
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
    );
  };

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  // Call this from checkout when user enters address
  const setRegion = (regionCode) => setShippingRegion(regionCode);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        subtotal,
        tax,
        taxRate, // expose so you can show "Tax (8%)"
        shipping,
        total,
        itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
        setRegion,
        taxLabel: taxConfig?.taxLabel || "Tax",
        taxInclusive: taxConfig?.taxInclusive || false,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
