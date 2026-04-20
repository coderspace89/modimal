"use client";

import React, { useState, useEffect } from "react";
import modiweekHeroStyles from "./ModiweekHero.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "@/context/FavoritesContext";
import Link from "next/link";

const ModiweekHero = ({ day }) => {
  const modiweekDay = day;

  const [modiweekHeroData, setModiweekHeroData] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedColors, setSelectedColors] = useState({});

  const activeDayQuery = qs.stringify(
    {
      filters: {
        day: { $eqi: modiweekDay },
        isActive: { $eq: true },
      },
      populate: {
        heroImage: true,
        products: {
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
    const fetchModiweekHero = async () => {
      const res = await fetch(`/api/modiweek-days?${activeDayQuery}`);
      const data = await res.json();
      console.log(data?.data?.[0]);
      setModiweekHeroData(data?.data?.[0] || null);
    };
    fetchModiweekHero();
  }, []);

  return (
    <section className={modiweekHeroStyles.container}>
      <Container>
        <Row>
          <Col lg={12}>
            <div className={modiweekHeroStyles.breadcrumbsContainer}>
              <Breadcrumb>
                <Breadcrumb.Item
                  href="/"
                  className={modiweekHeroStyles.breadcrumbsLink}
                >
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  href="/modiweek"
                  className={modiweekHeroStyles.breadcrumbsLink}
                >
                  Modiweek
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  active
                  className={modiweekHeroStyles.breadcrumbsText}
                >
                  {modiweekHeroData?.day}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col lg={6} className="mb-lg-0 mb-3">
            <div>
              <h2 className={modiweekHeroStyles.heroTitle}>
                {modiweekHeroData?.title}
              </h2>
            </div>
            <div>
              {modiweekHeroData?.heroImage && (
                <Image
                  src={getStrapiMedia(modiweekHeroData?.heroImage?.url)}
                  width={modiweekHeroData?.heroImage?.width}
                  height={modiweekHeroData?.heroImage?.height}
                  alt={modiweekHeroData?.heroImage?.name}
                  className={modiweekHeroStyles.heroImage}
                />
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className={modiweekHeroStyles.productsHeader}>
              <h5>Shop the look</h5>
              <span>
                {modiweekHeroData?.products?.length > 1
                  ? `${modiweekHeroData?.products?.length} Items`
                  : `${modiweekHeroData?.products?.length} Item`}
              </span>
            </div>
            <Row>
              {modiweekHeroData?.products?.map((product) => (
                <Col
                  key={product?.id}
                  lg={6}
                  md={6}
                  xs={6}
                  className="mb-lg-0 mb-3"
                >
                  <div>
                    <div className={modiweekHeroStyles.productImgContainer}>
                      <Link href={`/products/${product?.slug}`}>
                        <Image
                          src={getStrapiMedia(product?.mainImage?.url)}
                          width={product?.mainImage?.width}
                          height={product?.mainImage?.height}
                          alt={product?.mainImage?.name}
                          className={modiweekHeroStyles.mainImage}
                        />
                      </Link>

                      {/* Favorites Icon - Outside Link to prevent navigation */}
                      <button
                        className={modiweekHeroStyles.favoriteBtn}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(product.id);
                        }}
                      >
                        {isFavorite(product.id) ? (
                          <FaHeart color="#C30000" size={24} />
                        ) : (
                          <FaRegHeart color="#000" size={24} />
                        )}
                      </button>

                      <div className="position-absolute top-0 start-0 p-lg-4 p-2">
                        {product?.isNew && (
                          <span className={modiweekHeroStyles.newLabel}>
                            NEW
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/products/${product?.slug}`}
                      className="text-decoration-none"
                    >
                      <div>
                        <h6 className={modiweekHeroStyles.productTitle}>
                          {product?.name}
                        </h6>
                        <div className="d-flex align-items-center justify-content-between">
                          <span className={modiweekHeroStyles.categoryName}>
                            {product?.category?.name}
                          </span>
                          <span className={modiweekHeroStyles.priceText}>
                            ${product?.price}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Color options - prevent Link navigation */}
                    <div className={modiweekHeroStyles.colorOptions}>
                      {product.colors.map((colorOption) => (
                        <label
                          key={colorOption.id}
                          className={modiweekHeroStyles.colorLabel}
                        >
                          <input
                            type="radio"
                            name={`color-${product.id}`}
                            value={colorOption.id}
                            checked={
                              selectedColors[product.id]?.id === colorOption.id
                            }
                            onChange={() =>
                              setSelectedColors((prev) => ({
                                ...prev,
                                [product.id]: colorOption,
                              }))
                            }
                            className={modiweekHeroStyles.colorInput}
                          />
                          <span
                            className={modiweekHeroStyles.colorSwatch}
                            style={{ backgroundColor: colorOption.colorCode }}
                            title={colorOption.colorName}
                          >
                            {selectedColors[product.id]?.id ===
                              colorOption.id && (
                              <svg
                                className={modiweekHeroStyles.checkmark}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
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
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ModiweekHero;
