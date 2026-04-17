"use client";

import React, { useState, useEffect } from "react";
import productFeatureStyles from "./ProductFeatures.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import ReactMarkdown from "react-markdown";

const ProductFeatures = ({ slug }) => {
  const [productFeatures, setProductFeatures] = useState(null);
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
    const fetchProductFeatures = async () => {
      const res = await fetch(`/api/products?${query}`);
      const data = await res.json();
      console.log(data?.data?.[0]);
      setProductFeatures(data?.data?.[0] || null);
    };
    fetchProductFeatures();
  }, []);

  return (
    <section className={productFeatureStyles.container}>
      <Container>
        <Row>
          <Col lg={6} className="mb-lg-0 mb-3 order-lg-1 order-md-1 order-2">
            <Accordion flush id="product-accordion">
              {productFeatures?.productDetails?.map((productDetail) => (
                <Accordion.Item
                  eventKey={productDetail?.id}
                  key={productDetail?.id}
                  className={productFeatureStyles.accordionContainer}
                >
                  <Accordion.Header>{productDetail?.title}</Accordion.Header>
                  <Accordion.Body>
                    <div className={productFeatureStyles.accordionContent}>
                      <ReactMarkdown>{productDetail?.content}</ReactMarkdown>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
          <Col lg={6} className="mb-lg-0 mb-3 order-lg-2 order-md-2 order-1">
            <div>
              {productFeatures?.fabrics?.map((fabric) => (
                <div
                  key={fabric?.id}
                  className={productFeatureStyles.fabricsContainer}
                >
                  <h5 className={productFeatureStyles.fabricsTitle}>
                    {fabric?.name}
                  </h5>
                  <div className={productFeatureStyles.markdownContainer}>
                    <ReactMarkdown>{fabric?.description}</ReactMarkdown>
                  </div>
                  <div className={productFeatureStyles.featureTagsContainer}>
                    {fabric?.features?.map((feature) => (
                      <div key={feature?.id}>
                        <span>{feature?.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductFeatures;
