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
      // your API returns { data: { Hero: [ {...} ] } }
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
      className={`${homePageHeroStyles.hero} ${homePageHeroStyles[heroData.textPosition || "left"]}`}
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
            <h1 className={homePageHeroStyles.title}>
              {heroData.titleLine1}
              <br />
              {heroData.titleLine2}
            </h1>
            {heroData.ctaLabel && (
              <Link href={heroData.ctaUrl} className={homePageHeroStyles.heroBtn}>
                {heroData.ctaLabel}
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomePageHero;
