"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import { LiaTimesSolid } from "react-icons/lia";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import qs from "qs";
import checkoutCartStyles from "./CheckoutCart.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const CheckoutCart = () => {
  const [checkoutCartData, setCheckoutCartData] = useState(null);
  const { items, updateQuantity, removeItem, subtotal, tax, shipping, total } =
    useCart();

  // Fetch Page Data
  useEffect(() => {
    const fetchCheckoutCartData = async () => {
      const query = qs.stringify(
        { populate: { info: true } },
        { encodeValuesOnly: true },
      );
      try {
        const res = await fetch(`/api/checkout-page?${query}`);
        const data = await res.json();
        console.log(data?.data);
        setCheckoutCartData(data?.data || null);
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      }
    };
    fetchCheckoutCartData();
  }, []);

  return (
    <section className={checkoutCartStyles.container}>
      <Container>
        <Row>
          <Col>
            <div>
              {/* Breadcrumbs */}
              <Breadcrumb
                className={`${checkoutCartStyles.breadcrumbsContainer} d-lg-none d-md-none d-block`}
              >
                {checkoutCartData?.breadcrumbSteps?.map((step, idx) => (
                  <Breadcrumb.Item
                    key={step.text}
                    href={step.link}
                    active={idx === 1}
                    className={
                      idx === 1
                        ? checkoutCartStyles.breadcrumbsText
                        : checkoutCartStyles.breadcrumbsLink
                    }
                  >
                    {step.text}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
              <div className={checkoutCartStyles.cartTitleContainer}>
                <h2 className={checkoutCartStyles.cartTitle}>
                  {checkoutCartData?.info?.cartTitle}
                </h2>
              </div>
              {items.map((item) => (
                <div key={item.id} className="d-flex mb-4">
                  <div className="col-3 position-relative me-3">
                    <Image
                      src={getStrapiMedia(item.product.mainImage.url)}
                      width={item.product.mainImage.width}
                      height={item.product.mainImage.height}
                      alt={item.product.name}
                      className={checkoutCartStyles.mainImage}
                    />
                    <span className="position-absolute top-0 end-0 bg-white m-2 px-2">
                      <span className={checkoutCartStyles.itemQtyText}>
                        {item.quantity}
                      </span>
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <h6 className={checkoutCartStyles.productName}>
                        {item.product.name}
                      </h6>
                      <button
                        onClick={() => removeItem(item.id)}
                        className={checkoutCartStyles.removeBtn}
                      >
                        <LiaTimesSolid size={24} color="#0C0C0C" />
                      </button>
                    </div>
                    <p className={checkoutCartStyles.productSizeColor}>
                      Size: {item.size.name}
                    </p>
                    <p className={checkoutCartStyles.productSizeColor}>
                      Color: {item.color.colorName}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className={checkoutCartStyles.qtyBtnWrapper}>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className={checkoutCartStyles.qtyBtn}
                        >
                          <FiMinus size={24} color="#404e3e" />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className={checkoutCartStyles.qtyBtn}
                        >
                          <FiPlus size={24} color="#404e3e" />
                        </button>
                      </div>
                      <strong className={checkoutCartStyles.productPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-between mb-2">
                <span className={checkoutCartStyles.subTotalItems}>
                  {checkoutCartData?.info?.subtotalLabel} ({items.length})
                </span>
                <span className={checkoutCartStyles.subTotalItems}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className={checkoutCartStyles.subTotalItems}>
                  {checkoutCartData?.info?.taxLabel}
                </span>
                <span className={checkoutCartStyles.subTotalItems}>
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className={checkoutCartStyles.subTotalItems}>
                  {checkoutCartData?.info?.shippingLabel}
                </span>
                <span className={checkoutCartStyles.subTotalItems}>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <strong className={checkoutCartStyles.subTotalItems}>
                  {checkoutCartData?.info?.totalLabel}
                </strong>
                <strong className={checkoutCartStyles.subTotalItems}>
                  ${total.toFixed(2)}
                </strong>
              </div>
              <p className={checkoutCartStyles.taxText}>
                {checkoutCartData?.info?.taxDisclaimer}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CheckoutCart;
