"use client";

import React, { useState, useEffect } from "react";
import relatedProductStyles from "./RelatedProducts.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "@/context/FavoritesContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RelatedProducts = ({ slug }) => {
  const [relatedProductsData, setRelatedProductsData] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedColors, setSelectedColors] = useState({});
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
    const fetchRelatedProducts = async () => {
      const res = await fetch(`/api/products?${query}`);
      const data = await res.json();
      console.log(data?.data?.[0]);
      setRelatedProductsData(data?.data?.[0] || null);
    };
    fetchRelatedProducts();
  }, []);

  var settings = {
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className={relatedProductStyles.container}>
      <Container className="d-lg-block d-none">
        <div className={relatedProductStyles.sectionHeader}>
          <h2 className={relatedProductStyles.sectionTitle}>
            you may also like
          </h2>
        </div>
        <Row className="g-4">
          {relatedProductsData?.relatedProducts?.map((product) => (
            <Col
              key={product?.id}
              lg={4}
              md={6}
              xs={6}
              className="mb-lg-0 mb-3"
            >
              <div>
                <div className={relatedProductStyles.productImgContainer}>
                  <Link href={`/products/${product?.slug}`}>
                    <Image
                      src={getStrapiMedia(product?.mainImage?.url)}
                      width={product?.mainImage?.width}
                      height={product?.mainImage?.height}
                      alt={product?.mainImage?.name}
                      className={relatedProductStyles.mainImage}
                    />
                  </Link>

                  {/* Favorites Icon - Outside Link to prevent navigation */}
                  <button
                    className={relatedProductStyles.favoriteBtn}
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
                      <span className={relatedProductStyles.newLabel}>NEW</span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/products/${product?.slug}`}
                  className="text-decoration-none"
                >
                  <div>
                    <h6 className={relatedProductStyles.productTitle}>
                      {product?.name}
                    </h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className={relatedProductStyles.categoryName}>
                        {product?.category?.name}
                      </span>
                      <span className={relatedProductStyles.priceText}>
                        ${product?.price}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Color options - prevent Link navigation */}
                <div className={relatedProductStyles.colorOptions}>
                  {product.colors.map((colorOption) => (
                    <label
                      key={colorOption.id}
                      className={relatedProductStyles.colorLabel}
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
                        className={relatedProductStyles.colorInput}
                      />
                      <span
                        className={relatedProductStyles.colorSwatch}
                        style={{ backgroundColor: colorOption.colorCode }}
                        title={colorOption.colorName}
                      >
                        {selectedColors[product.id]?.id === colorOption.id && (
                          <svg
                            className={relatedProductStyles.checkmark}
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
      </Container>
      <Container className="d-lg-none d-block">
        <div className={relatedProductStyles.sectionHeader}>
          <h2 className={relatedProductStyles.sectionTitle}>
            you may also like
          </h2>
        </div>
        <Row className="g-4">
          <div className="slider-container">
            <Slider {...settings}>
              {relatedProductsData?.relatedProducts?.map((product) => (
                <Col
                  key={product?.id}
                  lg={4}
                  md={6}
                  xs={6}
                  className="mb-lg-0 mb-3"
                >
                  <div>
                    <div className={relatedProductStyles.productImgContainer}>
                      <Link href={`/products/${product?.slug}`}>
                        <Image
                          src={getStrapiMedia(product?.mainImage?.url)}
                          width={product?.mainImage?.width}
                          height={product?.mainImage?.height}
                          alt={product?.mainImage?.name}
                          className={relatedProductStyles.mainImage}
                        />
                      </Link>

                      {/* Favorites Icon - Outside Link to prevent navigation */}
                      <button
                        className={relatedProductStyles.favoriteBtn}
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
                          <span className={relatedProductStyles.newLabel}>
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
                        <h6 className={relatedProductStyles.productTitle}>
                          {product?.name}
                        </h6>
                        <div className="d-flex align-items-center justify-content-between">
                          <span className={relatedProductStyles.categoryName}>
                            {product?.category?.name}
                          </span>
                          <span className={relatedProductStyles.priceText}>
                            ${product?.price}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Color options - prevent Link navigation */}
                    <div className={relatedProductStyles.colorOptions}>
                      {product.colors.map((colorOption) => (
                        <label
                          key={colorOption.id}
                          className={relatedProductStyles.colorLabel}
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
                            className={relatedProductStyles.colorInput}
                          />
                          <span
                            className={relatedProductStyles.colorSwatch}
                            style={{ backgroundColor: colorOption.colorCode }}
                            title={colorOption.colorName}
                          >
                            {selectedColors[product.id]?.id ===
                              colorOption.id && (
                              <svg
                                className={relatedProductStyles.checkmark}
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
            </Slider>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default RelatedProducts;
