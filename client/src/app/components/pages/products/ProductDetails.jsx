"use client";

import React, { useState, useEffect, useRef } from "react";
import productDetailStyles from "./ProductDetails.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";

const ProductDetails = ({ slug }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState("");
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addItem } = useCart();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

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

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const thumbnailSettings = {
    asNavFor: nav1,
    ref: sliderRef2,
    slidesToShow: 3,
    vertical: true, // Key property
    verticalSwiping: true, // Improves mobile/mouse-wheel feel
    focusOnSelect: true,
    arrows: false, // Usually cleaner for vertical side-thumbs
  };

  var settings = {
    slidesToShow: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setError("Please select a color and size");
      return;
    }
    setError("");
    addItem(productDetails, selectedSize, selectedColor, 1);
  };

  return (
    <section className={productDetailStyles.container}>
      <Container>
        <Row>
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
          <Col lg={6}>
            <div className={productDetailStyles?.sliderContainer}>
              <div
                style={{ width: "125px" }}
                className="d-lg-block d-md-block d-none"
              >
                {/* Thumbnail Slider */}
                <Slider {...thumbnailSettings}>
                  {productDetails?.galleryImages?.map((galleryImage) => (
                    <div key={galleryImage?.id}>
                      {galleryImage && (
                        <Image
                          src={getStrapiMedia(galleryImage?.url)}
                          width={galleryImage?.width}
                          height={galleryImage?.height}
                          alt={galleryImage?.name}
                          className={productDetailStyles?.galleryImage}
                        />
                      )}
                    </div>
                  ))}
                </Slider>
              </div>
              <div className={productDetailStyles?.mainSliderWrapper}>
                {/* Main Slider */}
                <Slider asNavFor={nav2} ref={sliderRef1} {...settings}>
                  {productDetails?.galleryImages?.map((galleryImage) => (
                    <div key={galleryImage?.id}>
                      {galleryImage && (
                        <Image
                          src={getStrapiMedia(galleryImage?.url)}
                          width={galleryImage?.width}
                          height={galleryImage?.height}
                          alt={galleryImage?.name}
                          className={productDetailStyles?.mainImage}
                        />
                      )}
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div>
              <div>
                <h2 className={productDetailStyles.productName}>
                  {productDetails?.name}
                </h2>
                <p className={productDetailStyles.productDescription}>
                  {productDetails?.description}
                </p>
              </div>
              <div className={productDetailStyles.colorsLabelContainer}>
                <span>Colors</span>
              </div>
              <div className={productDetailStyles.colorOptions}>
                {productDetails?.colors?.map((colorOption) => (
                  <label
                    key={colorOption.id}
                    className={productDetailStyles.colorLabel}
                  >
                    <input
                      type="radio"
                      name={`color-${productDetails?.id}`}
                      value={colorOption.id}
                      checked={selectedColor?.id === colorOption.id}
                      onChange={() => setSelectedColor(colorOption)} // store whole object
                      className={productDetailStyles.colorInput}
                    />
                    <span
                      className={productDetailStyles.colorSwatch}
                      style={{ backgroundColor: colorOption.colorCode }}
                      title={colorOption.colorName}
                    >
                      {selectedColor?.id === colorOption.id && (
                        <svg
                          className={productDetailStyles.checkmark}
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
              <div className={productDetailStyles.sizeOptionsContainer}>
                <div className={productDetailStyles.sizeGuideContainer}>
                  <a href="#">Size Guide</a>
                </div>
                <Dropdown className="w-100">
                  <Dropdown.Toggle
                    variant="light"
                    className={productDetailStyles.sizeOptionsToggle}
                  >
                    Size
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={productDetailStyles.sizeOptions}>
                    {productDetails?.sizes?.map((size) => (
                      <Form.Check
                        type="checkbox"
                        label={size?.name}
                        id={size?.id}
                        key={size?.id}
                        className={productDetailStyles.formCheck}
                        onClick={() => setSelectedSize(size)}
                      />
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {error && <p className="text-danger mt-2">{error}</p>}
              <div className={productDetailStyles.addToCartBtnContainer}>
                <Button
                  variant="success"
                  className={productDetailStyles.addToCartBtn}
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </Button>
              </div>
              <div className={productDetailStyles.returnWishContainer}>
                <div className="order-lg-1 order-md-1 order-2">
                  <a href="#" className={productDetailStyles.returnText}>
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 8H17V4H3C1.9 4 1 4.9 1 6V17H3C3 18.66 4.34 20 6 20C7.66 20 9 18.66 9 17H15C15 18.66 16.34 20 18 20C19.66 20 21 18.66 21 17H23V12L20 8ZM19.5 9.5L21.46 12H17V9.5H19.5ZM6 18C5.45 18 5 17.55 5 17C5 16.45 5.45 16 6 16C6.55 16 7 16.45 7 17C7 17.55 6.55 18 6 18ZM8.22 15C7.67 14.39 6.89 14 6 14C5.11 14 4.33 14.39 3.78 15H3V6H15V15H8.22ZM18 18C17.45 18 17 17.55 17 17C17 16.45 17.45 16 18 16C18.55 16 19 16.45 19 17C19 17.55 18.55 18 18 18Z"
                          fill="#868686"
                        />
                      </svg>
                      easy return
                    </span>
                  </a>
                </div>
                <div className="order-lg-2 order-md-2 order-1">
                  <button
                    className={productDetailStyles.favoriteBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(productDetails?.id);
                    }}
                  >
                    {isFavorite(productDetails?.id) ? (
                      <span>
                        <FaHeart color="#C30000" size={24} /> added to wish list
                      </span>
                    ) : (
                      <span>
                        <FaRegHeart color="#404040" size={24} /> add to wish
                        list
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
