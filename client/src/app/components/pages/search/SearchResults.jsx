"use client";
import React, { useState, useEffect } from "react";
import searchResultStyles from "./SearchResults.module.css";
import { useSearch } from "@/context/SearchContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const SearchResults = () => {
  const { strapiQuery } = useSearch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?${strapiQuery}`);
        const data = await res.json();
        console.log(data?.data);
        setProducts(data?.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [strapiQuery]); // Re-fetch whenever query changes

  if (loading) return <div>Loading...</div>;

  return (
    <section className={searchResultStyles.container}>
      <Container>
        <Row>
          <Col>
            <div className={searchResultStyles.resultsLabelContainer}>
              <p className={searchResultStyles.resultsLabel}>
                {products.length} Items
              </p>
            </div>
          </Col>
        </Row>
        <Row className="g-4">
          {products?.map((product) => (
            <Col
              key={product?.id}
              lg={6}
              md={6}
              xs={6}
              className="mb-lg-0 mb-3"
            >
              <div>
                <Link href={product?.slug}>
                  {product?.mainImage && (
                    <div className={searchResultStyles.productImgContainer}>
                      <Image
                        src={getStrapiMedia(product?.mainImage?.url)}
                        width={product?.mainImage?.width}
                        height={product?.mainImage?.height}
                        alt={product?.mainImage?.name}
                        className={searchResultStyles.mainImage}
                      />
                      <div className="position-absolute top-0 end-0 p-lg-4 p-2">
                        {product?.favoritesIcon && (
                          <Image
                            src={getStrapiMedia(product?.favoritesIcon?.url)}
                            width={product?.favoritesIcon?.width}
                            height={product?.favoritesIcon?.height}
                            alt={product?.favoritesIcon?.name}
                          />
                        )}
                      </div>
                      <div className="position-absolute top-0 start-0 p-lg-4 p-2">
                        {product?.isNew && (
                          <span className={searchResultStyles.newLabel}>
                            NEW
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div>
                    <h6 className={searchResultStyles.productTitle}>
                      {product?.name}
                    </h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className={searchResultStyles.categoryName}>
                        {product?.category?.name}
                      </span>
                      <span className={searchResultStyles.priceText}>
                        ${product?.price}
                      </span>
                    </div>
                  </div>
                  <div className={searchResultStyles.colorOptions}>
                    {product.colors.map((colorOption) => (
                      <label
                        key={colorOption.id}
                        className={searchResultStyles.colorLabel}
                      >
                        <input
                          type="radio"
                          name="color"
                          value={colorOption.id}
                          checked={
                            selectedColor && selectedColor.id === colorOption.id
                          }
                          onChange={() => setSelectedColor(colorOption)}
                          className={searchResultStyles.colorInput}
                        />
                        <span
                          className={searchResultStyles.colorSwatch}
                          style={{ backgroundColor: colorOption.colorCode }}
                          title={colorOption.colorName}
                        >
                          {selectedColor &&
                            selectedColor.id === colorOption.id && (
                              <svg
                                className={searchResultStyles.checkmark}
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
        </Row>
      </Container>
    </section>
  );
};

export default SearchResults;
