"use client";

import React, { useState, useEffect } from "react";
import cartSummaryStyles from "./CartSummary.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { FiMinus, FiPlus } from "react-icons/fi";

const CartSummary = () => {
  const [cartSummaryData, setCartSummaryData] = useState(null);
  const { items, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    const fetchCartSummaryData = async () => {
      const res = await fetch(`/api/cart-page`);
      const data = await res.json();
      console.log(data?.data);
      setCartSummaryData(data?.data || null);
    };
    fetchCartSummaryData();
  }, []);

  return (
    <section className={cartSummaryStyles.container}>
      <Container>
        <Row>
          <Col>
            <div className={cartSummaryStyles.continueLinkContainer}>
              <h6>
                <Link
                  href={cartSummaryData?.continueShoppingUrl || "/shop-all"}
                  className={cartSummaryStyles.continueLink}
                >
                  {cartSummaryData?.continueShoppingText}
                </Link>
              </h6>
            </div>
            <div className={cartSummaryStyles.orderSummaryContainer}>
              <div className="col-4">
                <h6 className={cartSummaryStyles.orderSummaryLabel}>
                  {cartSummaryData?.priceLabel}
                </h6>
              </div>
              <div className="col-4 text-center">
                <h6 className={cartSummaryStyles.orderSummaryLabel}>
                  {cartSummaryData?.quantityLabel}
                </h6>
              </div>
              <div className="col-4 text-end">
                <h6 className={cartSummaryStyles.orderSummaryLabel}>
                  {cartSummaryData?.totalLabel}
                </h6>
              </div>
            </div>
            {items.map((item) => (
              <div key={item.id} className="d-flex align-items-center">
                <div className="col-4">
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="col-4 text-center">
                  <div className="d-inline-flex align-items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <FiMinus size={24} color="#404e3e" />
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FiPlus size={24} color="#404e3e" />
                    </button>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CartSummary;
