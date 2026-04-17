"use client";

import React, { useState, useEffect } from "react";
import plusSizeHeroStyles from "./PlusSizeHero.module.css";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { getStrapiMedia } from "@/lib/utils";
import qs from "qs";

const PlusSizeHero = () => {
  const [plusSizeHeroData, setPlusSizeHeroData] = useState(null);

  const plusSizeHeroQuery = qs.stringify(
    {
      populate: {
        heroImage: true,
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchPlusSizeHero = async () => {
      const res = await fetch(`/api/plus-size-page?${plusSizeHeroQuery}`);
      const data = await res.json();
      console.log(data?.data);
      setPlusSizeHeroData(data?.data || null);
    };
    fetchPlusSizeHero();
  }, []);

  const bgUrl = plusSizeHeroData?.heroImage
    ? getStrapiMedia(plusSizeHeroData?.heroImage?.url)
    : "";

  return (
    <section className={plusSizeHeroStyles.container}>
      <Container className={plusSizeHeroStyles.breadcrumbsContainer}>
        <Breadcrumb>
          <Breadcrumb.Item
            href="/"
            className={plusSizeHeroStyles.breadcrumbsLink}
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item
            active
            className={plusSizeHeroStyles.breadcrumbsText}
          >
            {plusSizeHeroData?.breadcrumbLabel}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container fluid className="p-0 m-0">
        <div
          className={plusSizeHeroStyles.heroImageContainer}
          style={{
            backgroundImage: bgUrl ? `url(${bgUrl})` : "none",
          }}
        ></div>
      </Container>
    </section>
  );
};

export default PlusSizeHero;
