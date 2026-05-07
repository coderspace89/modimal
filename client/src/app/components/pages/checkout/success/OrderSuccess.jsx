"use client";

import React, { useState, useEffect } from "react";
import orderSuccessStyles from "./OrderSuccess.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const OrderSuccess = () => {
  const [pageData, setPageData] = useState(null);

  // Fetch Page Labels
  useEffect(() => {
    const fetchPageData = async () => {
      const query = qs.stringify(
        { populate: { successIcon: true } },
        { encodeValuesOnly: true },
      );
      try {
        const res = await fetch(`/api/order-success-page?${query}`);
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
    <section className={orderSuccessStyles.container}>
      <Container>
        <Row>
          <Col>
            <div className={orderSuccessStyles.iconContainer}>
              {pageData?.successIcon && (
                <Image
                  src={getStrapiMedia(pageData?.successIcon?.url)}
                  width={pageData?.successIcon.width}
                  height={pageData?.successIcon?.height}
                  alt={pageData?.successIcon?.name}
                />
              )}
            </div>
            <div className="text-center">
              <h2 className={orderSuccessStyles.title}>{pageData?.title}</h2>
              <p className={orderSuccessStyles.subtitle}>
                {pageData?.subtitle}
              </p>
              <p className={orderSuccessStyles.receiptText}>
                {pageData?.receiptText}
              </p>
              <p className={orderSuccessStyles.contactHeading}>
                {pageData?.contactHeading}
              </p>
              <p className={orderSuccessStyles.phone}>{pageData?.phone}</p>
              <p className={orderSuccessStyles.phone}>OR</p>
              <p className={orderSuccessStyles.phone}>{pageData?.email}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OrderSuccess;
