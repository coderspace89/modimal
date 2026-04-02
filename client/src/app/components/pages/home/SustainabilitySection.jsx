"use client";

import React, { useState, useEffect } from "react";
import sustainabilityStyles from "./SustainabilitySection.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";

const SustainabilitySection = () => {
  const [sustainabilityData, setSustainabilityData] = useState(null);

  const sustainabilityQuery = qs.stringify(
    {
      populate: {
        sustainability: {
          on: {
            "blocks.sustainability-section": {
              populate: ["image"],
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchSustainabilitySection = async () => {
      const res = await fetch(`/api/home-page?${sustainabilityQuery}`);
      const data = await res.json();
      console.log(data?.data?.sustainability?.[0]);
      setSustainabilityData(data?.data?.sustainability?.[0] || null);
    };
    fetchSustainabilitySection();
  }, [sustainabilityQuery]);

  if (!sustainabilityData) return null;

  const backgroundImageUrl = sustainabilityData?.image
    ? getStrapiMedia(sustainabilityData?.image?.url)
    : "";

  return (
    <section
      className={sustainabilityStyles.container}
      style={{
        backgroundImage: backgroundImageUrl
          ? `url(${backgroundImageUrl})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "525px",
        display: "flex",
        alignItems: "end",
        justifyContent: "end",
      }}
    >
      <Container className="position-relative">
        <Row>
          <Col>
            <div
              className={`${sustainabilityStyles.textContainer} position-absolute bottom-0 end-0`}
            >
              <h6 className={sustainabilityStyles.title}>
                {sustainabilityData?.title}
              </h6>
              {sustainabilityData.ctaLabel && (
                <div className="d-flex justify-content-end">
                  <Link
                    href={sustainabilityData.ctaUrl}
                    className={sustainabilityStyles.ctaBtn}
                  >
                    {sustainabilityData.ctaLabel}
                  </Link>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SustainabilitySection;
