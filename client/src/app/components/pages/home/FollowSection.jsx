"use client";

import React, { useState, useEffect } from "react";
import followStyles from "./FollowSection.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";

const FollowSection = () => {
  const [followData, setFollowData] = useState(null);

  const followSectionQuery = qs.stringify(
    {
      populate: {
        follow: {
          on: {
            "blocks.follow-section": {
              populate: {
                followGrid: {
                  populate: ["image"],
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
    const fetchFollowSection = async () => {
      const res = await fetch(`/api/home-page?${followSectionQuery}`);
      const data = await res.json();
      console.log(data?.data?.follow?.[0]);
      setFollowData(data?.data?.follow?.[0] || null);
    };
    fetchFollowSection();
  }, [followSectionQuery]);

  return (
    <section className={followStyles.container}>
      <Container>
        <div className={followStyles.sectionHeader}>
          <h2 className={followStyles.sectionTitle}>
            {followData?.sectionTitle}
          </h2>
        </div>
        <Row className="g-0">
          <Col xs={6} lg={6} className="d-lg-block d-none">
            {followData?.followGrid?.[0] && (
              <Link href={followData.followGrid[0].url} target="_blank">
                <Image
                  src={getStrapiMedia(followData.followGrid[0].image.url)}
                  width={followData.followGrid[0].image.width}
                  height={followData.followGrid[0].image.height}
                  alt={followData.followGrid[0].image.name}
                  className={`${followStyles.gridImage} ${followStyles.largeImage}`}
                />
              </Link>
            )}
          </Col>
          <Col xs={6} lg={6} className="d-lg-block d-none">
            <Row className="g-0">
              {followData?.followGrid?.slice(1).map((gridItem) => (
                <Col key={gridItem.id} xs={12} lg={6}>
                  <Link href={gridItem.url} target="_blank">
                    <Image
                      src={getStrapiMedia(gridItem.image.url)}
                      width={gridItem.image.width}
                      height={gridItem.image.height}
                      alt={gridItem.image.name}
                      className={`${followStyles.gridImage} ${followStyles.smallImage}`}
                    />
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
          {/* show 2x2 grid on mobile */}
          {followData?.followGrid?.slice(0, 4).map((gridItem) => (
            <Col key={gridItem.id} xs={6} lg={6} className="d-lg-none d-block">
              <Link href={gridItem.url} target="_blank">
                <Image
                  src={getStrapiMedia(gridItem.image.url)}
                  width={gridItem.image.width}
                  height={gridItem.image.height}
                  alt={gridItem.image.name}
                  className={`${followStyles.gridImage} ${followStyles.smallImage}`}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FollowSection;
