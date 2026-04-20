"use client";

import React, { useState, useEffect } from "react";
import modiweekDayStyles from "./ModiweekDays.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "@/context/FavoritesContext";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ModiweekDays = () => {
  const [modiweekDaysData, setModiweekDaysData] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  const daysQuery = qs.stringify(
    {
      filters: { isActive: { $eq: true } },
      sort: ["order:asc"],
      populate: {
        heroImage: true,
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchModiweekDays = async () => {
      const res = await fetch(`/api/modiweek-days?${daysQuery}`);
      const data = await res.json();
      console.log(data?.data);
      setModiweekDaysData(data?.data || null);
    };
    fetchModiweekDays();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
    <section className={modiweekDayStyles.container}>
      <Container>
        <Row>
          <Col>
            <div className="slider-container" id="modiweek-slider">
              <Slider {...settings}>
                {modiweekDaysData?.map((modiweekCard) => (
                  <Col
                    key={modiweekCard?.id}
                    lg={4}
                    md={6}
                    xs={6}
                    className="mb-lg-0 mb-3"
                  >
                    <div>
                      {modiweekCard?.heroImage && (
                        <div className={modiweekDayStyles.productImgContainer}>
                          <Link
                            href={modiweekCard?.slug}
                            className="text-decoration-none"
                          >
                            <Image
                              src={getStrapiMedia(modiweekCard?.heroImage?.url)}
                              width={modiweekCard?.heroImage?.width}
                              height={modiweekCard?.heroImage?.height}
                              alt={modiweekCard?.heroImage?.name}
                              className={modiweekDayStyles.mainImage}
                            />
                          </Link>

                          <div className="position-absolute top-0 end-0 p-lg-4 p-2">
                            {/* Favorites Icon - Outside Link to prevent navigation */}
                            <button
                              className={modiweekDayStyles.favoriteBtn}
                              onClick={(e) => {
                                e.preventDefault();
                                toggleFavorite(modiweekCard?.id);
                              }}
                            >
                              {isFavorite(modiweekCard?.id) ? (
                                <FaHeart color="#C30000" size={24} />
                              ) : (
                                <FaRegHeart color="#000" size={24} />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                      <div>
                        <Link
                          href={modiweekCard?.slug}
                          className="text-decoration-none"
                        >
                          <h6 className={modiweekDayStyles.productTitle}>
                            {modiweekCard?.title}
                          </h6>
                        </Link>
                      </div>
                    </div>
                  </Col>
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ModiweekDays;
