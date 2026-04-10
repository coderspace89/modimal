"use client";

import React, { useState, useEffect } from "react";
import modiweekStyles from "./ModiweekSection.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ModiweekSection = () => {
  const [modiweekData, setModiweekData] = useState(null);

  const modiweekSectionQuery = qs.stringify(
    {
      populate: {
        modiweek: {
          on: {
            "blocks.modiweek-section": {
              populate: {
                modiweekCards: {
                  populate: ["image", "favoritesIcon"],
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
    const fetchModiweekData = async () => {
      const res = await fetch(`/api/home-page?${modiweekSectionQuery}`);
      const data = await res.json();
      console.log(data?.data?.modiweek?.[0]);
      setModiweekData(data?.data?.modiweek?.[0] || null);
    };
    fetchModiweekData();
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
    <section className={modiweekStyles.container}>
      <Container>
        <Row>
          <div className={modiweekStyles.sectionHeader}>
            <h2 className={modiweekStyles.sectionTitle}>
              {modiweekData?.sectionTitle}
            </h2>
          </div>
          <div className="slider-container" id="modiweek-slider">
            <Slider {...settings}>
              {modiweekData?.modiweekCards?.map((modiweekCard) => (
                <Col
                  key={modiweekCard?.id}
                  lg={4}
                  md={6}
                  xs={6}
                  className="mb-lg-0 mb-3"
                >
                  <div>
                    <Link
                      href={modiweekCard?.url}
                      className="text-decoration-none"
                    >
                      {modiweekCard?.image && (
                        <div className={modiweekStyles.productImgContainer}>
                          <Image
                            src={getStrapiMedia(modiweekCard?.image?.url)}
                            width={modiweekCard?.image?.width}
                            height={modiweekCard?.image?.height}
                            alt={modiweekCard?.image?.name}
                            className={modiweekStyles.mainImage}
                          />
                          <div className="position-absolute top-0 end-0 p-lg-4 p-2">
                            {modiweekCard?.favoritesIcon && (
                              <Image
                                src={getStrapiMedia(
                                  modiweekCard?.favoritesIcon?.url,
                                )}
                                width={modiweekCard?.favoritesIcon?.width}
                                height={modiweekCard?.favoritesIcon?.height}
                                alt={modiweekCard?.favoritesIcon?.name}
                              />
                            )}
                          </div>
                        </div>
                      )}
                      <div>
                        <h6 className={modiweekStyles.productTitle}>
                          {modiweekCard?.label}
                        </h6>
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

export default ModiweekSection;
