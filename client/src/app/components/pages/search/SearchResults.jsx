"use client";
import React, { useState, useEffect, useRef } from "react";
import searchResultStyles from "./SearchResults.module.css";
import { useSearch } from "@/context/SearchContext";
import { useFavorites } from "@/context/FavoritesContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { usePathname } from "next/navigation";

const SearchResults = () => {
  const { strapiQuery, currentPage, setCurrentPage, pageCount, setPageCount } =
    useSearch();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedColors, setSelectedColors] = useState({});
  const prevQueryRef = useRef(null); // track if filters changed

  const pathname = usePathname();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // Extract page from strapiQuery to check if only page changed
      const urlParams = new URLSearchParams(
        strapiQuery.split("?")[1] || strapiQuery,
      );
      const queryWithoutPage = strapiQuery.replace(
        /&?pagination\[page\]=\d+/,
        "",
      );
      const isSameFilters = prevQueryRef.current === queryWithoutPage;

      try {
        const res = await fetch(`/api/products?${strapiQuery}`);
        const data = await res.json();
        const newProducts = data?.data || [];
        const meta = data?.meta?.pagination;

        // If filters changed, replace. If only page changed, append.
        if (currentPage === 1 || !isSameFilters) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => {
            // Dedupe: filter out any products that already exist
            const existingIds = new Set(prev.map((p) => p.id));
            const uniqueNew = newProducts.filter((p) => !existingIds.has(p.id));
            return [...prev, ...uniqueNew];
          });
        }

        setTotalItems(meta?.total || 0);
        setPageCount(meta?.pageCount || 1);
        prevQueryRef.current = queryWithoutPage;
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [strapiQuery, setPageCount]); // Remove currentPage from deps

  if (loading && currentPage === 1) return <div>Loading...</div>;

  return (
    <section className={searchResultStyles.container}>
      <Container>
        <Row>
          <Col>
            <div className={searchResultStyles.resultsLabelContainer}>
              <p className={searchResultStyles.resultsLabel}>
                {totalItems > 1 ? `${totalItems} Items` : `${totalItems} Item`}
              </p>
            </div>
          </Col>
        </Row>
        <Row className="g-4">
          {products?.map((product, index) => (
            <Col
              key={`${product.id}-${index}`}
              lg={6}
              md={6}
              xs={6}
              className="mb-lg-0 mb-3"
            >
              <div>
                <div className={searchResultStyles.productImgContainer}>
                  <Link href={`/products/${product?.slug}`}>
                    {product?.mainImage && (
                      <Image
                        src={getStrapiMedia(product?.mainImage?.url)}
                        width={product?.mainImage?.width}
                        height={product?.mainImage?.height}
                        alt={product?.mainImage?.name}
                        className={searchResultStyles.mainImage}
                      />
                    )}
                  </Link>

                  <button
                    className={searchResultStyles.favoriteBtn}
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
                      <span className={searchResultStyles.newLabel}>NEW</span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/products/${product?.slug}`}
                  className="text-decoration-none"
                >
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
                </Link>

                <div className={searchResultStyles.colorOptions}>
                  {product.colors.map((colorOption) => (
                    <label
                      key={colorOption.id}
                      className={searchResultStyles.colorLabel}
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
                        className={searchResultStyles.colorInput}
                      />
                      <span
                        className={searchResultStyles.colorSwatch}
                        style={{ backgroundColor: colorOption.colorCode }}
                        title={colorOption.colorName}
                      >
                        {selectedColors[product.id]?.id === colorOption.id && (
                          <svg
                            className={searchResultStyles.checkmark}
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

        {/* Load More */}
        {(pathname === "/shop-all" || pathname === "/plus-size") &&
          currentPage < pageCount && (
            <Row>
              <Col className="text-center mt-4">
                <button
                  className={searchResultStyles.loadMoreBtn}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={loading}
                >
                  {loading && currentPage > 1 ? "Loading..." : "Load More"}
                </button>
              </Col>
            </Row>
          )}
      </Container>
    </section>
  );
};

export default SearchResults;
