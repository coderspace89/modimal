"use client";

import React, { useState, useEffect } from "react";
import paymentFailedStyles from "./PaymentFailed.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";

const PaymentFailed = () => {
  const [pageData, setPageData] = useState(null);

  // Fetch Page Labels
  useEffect(() => {
    const fetchPageData = async () => {
      const query = qs.stringify(
        { populate: { errorIcon: true } },
        { encodeValuesOnly: true },
      );
      try {
        const res = await fetch(`/api/payment-failed-page?${query}`);
        const data = await res.json();
        console.log(data?.data);
        setPageData(data?.data || null);
      } catch (error) {
        console.error("Failed to fetch page data", error);
      }
    };
    fetchPageData();
  }, []);
  return (
    <section className={paymentFailedStyles.container}>
      <Container>
        <Row>
          <Col>
            <div className={paymentFailedStyles.iconContainer}>
              {pageData?.errorIcon && (
                <Image
                  src={getStrapiMedia(pageData?.errorIcon?.url)}
                  width={pageData?.errorIcon.width}
                  height={pageData?.errorIcon?.height}
                  alt={pageData?.errorIcon?.name}
                />
              )}
            </div>
            <div className="text-center">
              <h2 className={paymentFailedStyles.title}>{pageData?.title}</h2>
              <div className={paymentFailedStyles.descriptionContainer}>
                <p className={paymentFailedStyles.subtitle}>
                  {pageData?.description1}
                </p>
                <p className={paymentFailedStyles.subtitle}>
                  {pageData?.description2}
                </p>
                <p className={paymentFailedStyles.subtitle}>
                  {pageData?.description3}
                </p>
              </div>
              <div className="text-center">
                <Link
                  href="/checkout/payment"
                  className={`${paymentFailedStyles.payNowLink} mx-auto`}
                >
                  {pageData?.payNowButtonText || "Pay Now"}
                </Link>
              </div>
              <Link
                href={pageData?.backToOrdersUrl || "/shopping-cart"}
                className={paymentFailedStyles.backToOrdersLink}
              >
                <span className="me-1">
                  <BiChevronLeft size={24} color="#5A6D57" />
                </span>
                {pageData?.backToOrdersText}
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PaymentFailed;
