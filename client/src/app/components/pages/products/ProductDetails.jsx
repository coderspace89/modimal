"use client";

import React, { useState, useEffect } from "react";
import productDetailStyles from "./ProductDetails.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const ProductDetails = ({ slug }) => {
  const [productDetails, setProductDetails] = useState(null);

  const productSlug = slug;

  const query = qs.stringify(
    {
      filters: { slug: { $eq: productSlug } },
      populate: {
        mainImage: true,
        galleryImages: true,
        category: { populate: "*" },
        colors: { populate: "*" },
        sizes: { sort: ["order:asc"] },
        fabrics: {
          populate: {
            features: true,
          },
        },
        productDetails: true,
        relatedProducts: {
          populate: {
            mainImage: true,
            colors: true,
            category: true,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchProductDetails = async () => {
      const res = await fetch(`/api/products?${query}`);
      const data = await res.json();
      console.log(data?.data?.[0]);
      setProductDetails(data?.data?.[0] || null);
    };
    fetchProductDetails();
  }, []);

  return (
    <section className={productDetailStyles.container}>
      <Container>
        <Row>
          <Col lg={6}>
            <div className={productDetailStyles.breadcrumbsContainer}>
              <Breadcrumb>
                <Breadcrumb.Item
                  href="/"
                  className={productDetailStyles.breadcrumbsLink}
                >
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  href={productDetails?.category?.slug}
                  className={productDetailStyles.breadcrumbsLink}
                >
                  {productDetails?.category?.name}
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  active
                  className={productDetailStyles.breadcrumbsText}
                >
                  {productDetails?.name}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
