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
  const {
    items,
    updateQuantity,
    subtotal,
    tax,
    taxRate,
    shipping,
    total,
    itemCount,
    taxLabel,
  } = useCart();

  useEffect(() => {
    const fetchCartSummaryData = async () => {
      const res = await fetch(`/api/cart-page`);
      const data = await res.json();
      console.log(data?.data);
      setCartSummaryData(data?.data || null);
    };
    fetchCartSummaryData();
  }, []);

  if (!items.length) {
    return null;
  }

  return (
    <section className={cartSummaryStyles.container}>
      <Container>
        <Row>
          <Col>
            <div
              className={`${cartSummaryStyles.continueLinkContainer} d-lg-block d-none`}
            >
              <h6 className="pt-4">
                <Link
                  href={cartSummaryData?.continueShoppingUrl || "/shop-all"}
                  className={cartSummaryStyles.continueLink}
                >
                  {cartSummaryData?.continueShoppingText}
                </Link>
              </h6>
            </div>
            <div
              className={`${cartSummaryStyles.orderSummaryContainer} d-lg-flex d-none`}
            >
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
            <div
              className={`${cartSummaryStyles.cartSummaryWrapper} d-lg-block d-none`}
            >
              {items.map((item) => (
                <div key={item.id} className="d-flex align-items-baseline">
                  <div
                    className={`${cartSummaryStyles.cartItemsContainer} col-4`}
                  >
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div
                    className={`${cartSummaryStyles.cartItemsContainer} col-4 text-center`}
                  >
                    <div className={cartSummaryStyles.qtyBtnWrapper}>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className={cartSummaryStyles.qtyBtn}
                      >
                        <FiMinus size={24} color="#404e3e" />
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className={cartSummaryStyles.qtyBtn}
                      >
                        <FiPlus size={24} color="#404e3e" />
                      </button>
                    </div>
                  </div>
                  <div
                    className={`${cartSummaryStyles.cartItemsContainer} col-4 text-end`}
                  >
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="d-flex justify-content-between mb-3">
                <span className={cartSummaryStyles.subTotalItems}>
                  {cartSummaryData?.subtotalLabel} ({itemCount})
                </span>
                <span className={cartSummaryStyles.subTotalItems}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className={cartSummaryStyles.subTotalItems}>
                  {taxLabel || cartSummaryData?.taxLabel} (
                  {(taxRate * 100).toFixed(2)}%)
                </span>
                <span className={cartSummaryStyles.subTotalItems}>
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className={cartSummaryStyles.subTotalItems}>
                  {cartSummaryData?.shippingLabel}
                </span>
                <span className={cartSummaryStyles.subTotalItems}>
                  {shipping === 0
                    ? cartSummaryData?.shippingDefaultText
                    : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <strong className={cartSummaryStyles.subTotalItems}>
                  {cartSummaryData?.totalOrdersLabel}
                </strong>
                <strong className={cartSummaryStyles.subTotalItems}>
                  ${total.toFixed(2)}
                </strong>
              </div>
              <p className={cartSummaryStyles.taxText}>
                {cartSummaryData?.taxDisclaimer}
              </p>
              <div className="text-end">
                <Link
                  href={cartSummaryData?.nextButtonUrl || "/checkout/info"}
                  className={cartSummaryStyles.nextBtn}
                >
                  {cartSummaryData?.nextButtonText}
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CartSummary;
