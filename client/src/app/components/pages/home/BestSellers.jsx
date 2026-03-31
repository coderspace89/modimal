"use client";

import React, { useState, useEffect } from "react";
import bestSellersStyles from "./BestSellers.module.css";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";

const BestSellers = () => {
  const [bestSellersData, setBestSellersData] = useState(null);

  const bestSellersQuery = qs.stringify(
    {
      populate: {
        bestSellers: {
          on: {
            "blocks.best-sellers": {
              populate: {
                products: {
                  populate: {
                    mainImage: true,
                    favoritesIcon: true,
                    category: true,
                    colors: true,
                  },
                },
              },
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchBestSellers = async () => {
      const res = await fetch(`/api/home-page?${bestSellersQuery}`);
      const data = await res.json();
      console.log(data?.data?.bestSellers?.[0]);
      setBestSellersData(data?.data?.bestSellers?.[0] || null);
    };
    fetchBestSellers();
  }, [bestSellersQuery]);

  return (
    <section className={bestSellersStyles.container}>
      <Container>
        <Row>
          <div className={bestSellersStyles.sectionHeader}>
            <h2 className={bestSellersStyles.sectionTitle}>
              {bestSellersData?.sectionTitle}
            </h2>
            <Link
              href={bestSellersData?.viewAllLink || ""}
              className={bestSellersStyles.viewAllLink}
            >
              {bestSellersData?.viewAllText}
            </Link>
          </div>
          {bestSellersData?.products?.map((product) => (
            <Col key={product?.id} lg={4}>
              <div>
                <Link href={product?.slug}>
                  {product?.mainImage && (
                    <div className="position-relative">
                      <Image
                        src={getStrapiMedia(product?.mainImage?.url)}
                        width={product?.mainImage?.width}
                        height={product?.mainImage?.height}
                        alt={product?.mainImage?.name}
                        className={bestSellersStyles.mainImage}
                      />
                      <div className="position-absolute top-0 end-0 p-4">
                        {product?.favoritesIcon && (
                          <Image
                            src={getStrapiMedia(product?.favoritesIcon?.url)}
                            width={product?.favoritesIcon?.width}
                            height={product?.favoritesIcon?.height}
                            alt={product?.favoritesIcon?.name}
                          />
                        )}
                      </div>
                    </div>
                  )}
                  <div>
                    <h6 className={bestSellersStyles.productTitle}>
                      {product?.name}
                    </h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <span>{product?.category?.name}</span>
                      <span>${product?.price}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default BestSellers;
