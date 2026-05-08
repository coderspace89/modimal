"use client";

import React, { useState, useEffect } from "react";
import sustainabilityHeroStyles from "./SustainabilityHero.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { usePathname } from "next/navigation";
import { getStrapiMedia } from "@/lib/utils";

const SustainabilityHero = () => {
  const [heroSectionData, setHeroSectionData] = useState(null);
  const pathname = usePathname();

  const breadCrumbs = pathname.split("/").filter((part) => part !== "");

  const query = qs.stringify(
    {
      populate: {
        heroBanner: {
          on: {
            "blocks.sustainability-hero": {
              populate: {
                backgroundImage: true,
              },
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  useEffect(() => {
    const fetchHeroSection = async () => {
      const res = await fetch(`/api/sustainability-page?${query}`);
      const data = await res.json();
      console.log(data?.data?.heroBanner?.[0]);
      setHeroSectionData(data?.data.heroBanner?.[0] || null);
    };
    fetchHeroSection();
  }, []);

  const bgUrl = heroSectionData?.backgroundImage
    ? getStrapiMedia(heroSectionData?.backgroundImage?.url)
    : "";

  return (
    <section className={sustainabilityHeroStyles.container}>
      <Container>
        <div className={sustainabilityHeroStyles.breadcrumbsContainer}>
          <Breadcrumb>
            <Breadcrumb.Item
              href="/"
              className={sustainabilityHeroStyles.breadcrumbsLink}
            >
              Home
            </Breadcrumb.Item>
            {breadCrumbs.map((item, index) => (
              <Breadcrumb.Item
                href={index === 0 ? "/sustainability" : item}
                key={index}
                active={index === 1}
                className={
                  index === 0
                    ? sustainabilityHeroStyles.breadcrumbsLink
                    : sustainabilityHeroStyles.breadcrumbsText
                }
              >
                {item}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
      </Container>
      <Container fluid className="p-0 m-0">
        <div
          className={sustainabilityHeroStyles.heroImageContainer}
          style={{
            backgroundImage: bgUrl ? `url(${bgUrl})` : "none",
          }}
        >
          <div className="position-absolute bottom-0 start-50 translate-middle">
            <h2 className={sustainabilityHeroStyles.title}>
              {heroSectionData?.title}
            </h2>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SustainabilityHero;
