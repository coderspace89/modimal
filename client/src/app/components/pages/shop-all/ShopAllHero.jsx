"use client";

import React, { useState, useEffect } from "react";
import shopAllHeroStyles from "./ShopAllHero.module.css";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { getStrapiMedia } from "@/lib/utils";
import qs from "qs";

const ShopAllHero = () => {
  const [shopAllHeroData, setShopAllHeroData] = useState(null);

  const shopAllHeroQuery = qs.stringify(
    {
      populate: {
        heroImage: true,
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchShopAllHero = async () => {
      const res = await fetch(`/api/shop-all-page?${shopAllHeroQuery}`);
      const data = await res.json();
      console.log(data?.data);
      setShopAllHeroData(data?.data || null);
    };
    fetchShopAllHero();
  }, []);

  const bgUrl = shopAllHeroData?.heroImage
    ? getStrapiMedia(shopAllHeroData?.heroImage?.url)
    : "";

  return (
    <section className={shopAllHeroStyles.container}>
      <Container className={shopAllHeroStyles.breadcrumbsContainer}>
        <Breadcrumb>
          <Breadcrumb.Item
            href="/"
            className={shopAllHeroStyles.breadcrumbsLink}
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active className={shopAllHeroStyles.breadcrumbsText}>
            {shopAllHeroData?.breadcrumbLabel}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container fluid className="p-0 m-0">
        <div
          className={shopAllHeroStyles.heroImageContainer}
          style={{
            backgroundImage: bgUrl ? `url(${bgUrl})` : "none",
          }}
        ></div>
      </Container>
    </section>
  );
};

export default ShopAllHero;
