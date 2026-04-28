"use client";

import React, { useState, useEffect } from "react";
import cartItemStyles from "./CartItems.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import { LiaTimesSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { FiMinus, FiPlus } from "react-icons/fi";

const CartItems = () => {
  const [cartItemsData, setCartItemsData] = useState(null);
  const { items, updateQuantity, removeItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchCartItemsData = async () => {
      const res = await fetch(`/api/cart-page`);
      const data = await res.json();
      console.log(data?.data);
      setCartItemsData(data?.data || null);
    };
    fetchCartItemsData();
  }, []);

  if (!items.length) {
    return (
      <section className={cartItemStyles.container}>
        <Container>
          <Row>
            <Col>
              <div className="text-center">
                <p>{cartItemsData?.emptyCartText}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section className={cartItemStyles.container}>
      <Container>
        <Row>
          <Col>
            <div className={cartItemStyles.cartTitleContainer}>
              <button
                type="button"
                onClick={() => router.back()}
                className={cartItemStyles.backBtn}
              >
                {cartItemsData?.backText}
              </button>
              <h2 className={cartItemStyles.cartTitle}>
                {cartItemsData?.title}
              </h2>
            </div>
            <div className={cartItemStyles.orderSummaryContainer}>
              <h5 className={cartItemStyles.orderSummaryLabel}>
                {cartItemsData?.orderSummaryLabel}
              </h5>
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                className="d-flex align-items-start justify-content-between py-3"
              >
                <div className="d-flex gap-3">
                  <div className="col-3">
                    <Image
                      src={getStrapiMedia(item.product.mainImage.url)}
                      width={item.product.mainImage.width}
                      height={item.product.mainImage.height}
                      alt={item.product.name}
                      className={cartItemStyles.mainImage}
                    />
                  </div>
                  <div>
                    <h6 className={cartItemStyles.productName}>
                      {item.product.name}
                    </h6>
                    <p className={cartItemStyles.productSizeColor}>
                      Size: {item.size.name}
                    </p>
                    <p className={cartItemStyles.productSizeColor}>
                      Color: {item.color.colorName}
                    </p>
                    <div className="d-lg-none d-block">
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-column gap-4">
                  <button
                    onClick={() => removeItem(item.id)}
                    className={cartItemStyles.removeBtn}
                  >
                    <LiaTimesSolid size={24} color="#0C0C0C" />
                  </button>
                  <div
                    className={`${cartItemStyles.qtyBtnWrapper} d-lg-none d-inline-flex`}
                  >
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={cartItemStyles.qtyBtn}
                    >
                      <FiMinus size={24} color="#404e3e" />
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={cartItemStyles.qtyBtn}
                    >
                      <FiPlus size={24} color="#404e3e" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CartItems;
