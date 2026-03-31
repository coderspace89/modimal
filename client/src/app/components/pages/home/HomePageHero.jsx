"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia } from "@/lib/utils";
import homePageHeroStyles from "./HomePageHero.module.css";

const HomePageHero = () => {
  const [heroData, setHeroData] = useState(null);

  const heroQuery = qs.stringify(
    {
      populate: {
        Hero: {
          on: {
            "blocks.hero-section": {
              populate: ["backgroundImage"],
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchHero = async () => {
      const res = await fetch(`/api/home-page?${heroQuery}`);
      const data = await res.json();
      console.log(data?.data?.Hero?.[0]);
      setHeroData(data?.data?.Hero?.[0] || null);
    };
    fetchHero();
  }, [heroQuery]);

  if (!heroData) return null; // <-- prevent render until data is ready

  const bgUrl = heroData.backgroundImage
    ? getStrapiMedia(heroData.backgroundImage.url)
    : "";

  return (
    <section
      className={homePageHeroStyles.container}
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "600px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Row>
          <Col>
            <div className={homePageHeroStyles.titleContainer}>
              <div className="position-absolute top-100 start-0">
                <h2 className={homePageHeroStyles.title}>
                  {heroData.titleLine1}
                </h2>
                <h2 className={homePageHeroStyles.title}>
                  {heroData.titleLine2}
                </h2>
                {heroData.ctaLabel && (
                  <Link
                    href={heroData.ctaUrl}
                    className={homePageHeroStyles.ctaBtn}
                  >
                    {heroData.ctaLabel}
                  </Link>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomePageHero;
