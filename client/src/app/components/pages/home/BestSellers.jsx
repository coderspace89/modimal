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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BestSellers = () => {
  const [bestSellersData, setBestSellersData] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

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

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
    ],
  };

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
          <div className="slider-container">
            <Slider {...settings}>
              {bestSellersData?.products?.map((product) => (
                <Col
                  key={product?.id}
                  lg={4}
                  md={6}
                  xs={6}
                  className="mb-lg-0 mb-3"
                >
                  <div>
                    <Link href={product?.slug}>
                      {product?.mainImage && (
                        <div className={bestSellersStyles.productImgContainer}>
                          <Image
                            src={getStrapiMedia(product?.mainImage?.url)}
                            width={product?.mainImage?.width}
                            height={product?.mainImage?.height}
                            alt={product?.mainImage?.name}
                            className={bestSellersStyles.mainImage}
                          />
                          <div className="position-absolute top-0 end-0 p-lg-4 p-2">
                            {product?.favoritesIcon && (
                              <Image
                                src={getStrapiMedia(
                                  product?.favoritesIcon?.url,
                                )}
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
                          <span className={bestSellersStyles.categoryName}>
                            {product?.category?.name}
                          </span>
                          <span className={bestSellersStyles.priceText}>
                            ${product?.price}
                          </span>
                        </div>
                      </div>
                      <div className={bestSellersStyles.colorOptions}>
                        {product.colors.map((colorOption) => (
                          <label
                            key={colorOption.id}
                            className={bestSellersStyles.colorLabel}
                          >
                            <input
                              type="radio"
                              name="color"
                              value={colorOption.id}
                              checked={
                                selectedColor &&
                                selectedColor.id === colorOption.id
                              }
                              onChange={() => setSelectedColor(colorOption)}
                              className={bestSellersStyles.colorInput}
                            />
                            <span
                              className={bestSellersStyles.colorSwatch}
                              style={{ backgroundColor: colorOption.colorCode }}
                              title={colorOption.colorName}
                            >
                              {selectedColor &&
                                selectedColor.id === colorOption.id && (
                                  <svg
                                    className={bestSellersStyles.checkmark}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                )}
                            </span>
                          </label>
                        ))}
                      </div>
                    </Link>
                  </div>
                </Col>
              ))}
            </Slider>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default BestSellers;
