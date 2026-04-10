"use client";
import React, { useState, useEffect } from "react";
import favoritesPageStyles from "./FavoritesPage.module.css";
import { useFavorites } from "@/context/FavoritesContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import qs from "qs";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FavoritesPage = () => {
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      const query = qs.stringify({
        filters: { id: { $in: favoriteIds } },
        populate: {
          mainImage: true,
          colors: true,
          category: true,
        },
      });
      try {
        const res = await fetch(`/api/products?${query}`);
        const data = await res.json();
        setProducts(data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [favoriteIds]);

  if (loading) return <div>Loading...</div>;
  return (
    <section className={favoritesPageStyles.container}>
      <Container>
        <div className={favoritesPageStyles.sectionHeader}>
          <h5>My Wish List</h5>
          <p>
            {products.length > 1
              ? `${products.length} Items`
              : `${products.length} Item`}
          </p>
        </div>
        {products.length === 0 ? (
          <div className="text-center">
            <p>You haven't saved any items yet.</p>
          </div>
        ) : (
          <Row className="g-4">
            {products?.map((product) => (
              <Col
                key={product?.id}
                lg={4}
                md={6}
                xs={6}
                className="mb-lg-0 mb-3"
              >
                <div>
                  <div className={favoritesPageStyles.productImgContainer}>
                    <Link href={`/products/${product?.slug}`}>
                      <Image
                        src={getStrapiMedia(product?.mainImage?.url)}
                        width={product?.mainImage?.width}
                        height={product?.mainImage?.height}
                        alt={product?.mainImage?.name}
                        className={favoritesPageStyles.mainImage}
                      />
                    </Link>

                    {/* Favorites Icon - Outside Link to prevent navigation */}
                    <button
                      className={favoritesPageStyles.favoriteBtn}
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
                        <span className={favoritesPageStyles.newLabel}>
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
                      <h6 className={favoritesPageStyles.productTitle}>
                        {product?.name}
                      </h6>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className={favoritesPageStyles.categoryName}>
                          {product?.category?.name}
                        </span>
                        <span className={favoritesPageStyles.priceText}>
                          ${product?.price}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Color options - prevent Link navigation */}
                  <div className={favoritesPageStyles.colorOptions}>
                    {product.colors.map((colorOption) => (
                      <label
                        key={colorOption.id}
                        className={favoritesPageStyles.colorLabel}
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
                          className={favoritesPageStyles.colorInput}
                        />
                        <span
                          className={favoritesPageStyles.colorSwatch}
                          style={{ backgroundColor: colorOption.colorCode }}
                          title={colorOption.colorName}
                        >
                          {selectedColors[product.id]?.id ===
                            colorOption.id && (
                            <svg
                              className={favoritesPageStyles.checkmark}
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
        )}
      </Container>
    </section>
  );
};

export default FavoritesPage;
