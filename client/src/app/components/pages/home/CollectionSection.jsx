"use client";

import React, { useState, useEffect } from "react";
import collectionStyles from "./CollectionSection.module.css";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";

const CollectionSection = () => {
  const [collectionData, setCollectionData] = useState(null);

  const collectionSectionQuery = qs.stringify(
    {
      populate: {
        collection: {
          on: {
            "blocks.collection-section": {
              populate: {
                collectionBanner: {
                  populate: ["backgroundImage"],
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
    const fetchBestSellers = async () => {
      const res = await fetch(`/api/home-page?${collectionSectionQuery}`);
      const data = await res.json();
      console.log(data?.data?.collection?.[0]);
      setCollectionData(data?.data?.collection?.[0] || null);
    };
    fetchBestSellers();
  }, []);

  return (
    <section className={collectionStyles.container}>
      <Container>
        <Row>
          <div>
            <h2 className={collectionStyles.sectionTitle}>
              {collectionData?.sectionTitle}
            </h2>
          </div>

          {/* 1. This container holds the entire grid */}
          <div className={collectionStyles["collection-grid"]}>
            {collectionData?.collectionBanner?.map((banner, index) => {
              // 2. Determine the specific class based on index or ID
              // Assuming index 0=Blouses, 1=Pants, 2=Dresses, 3=Outwear
              const areaClasses = ["blouses", "pants", "dresses", "outwear"];
              const areaClass = areaClasses[index] || "";

              return (
                <div
                  key={banner.id}
                  className={`${collectionStyles["grid-item"]} ${collectionStyles[areaClass]}`}
                >
                  <Link href={banner?.ctaUrl || "#"}>
                    {banner?.backgroundImage && (
                      <div className={collectionStyles.imageWrapper}>
                        <Image
                          src={getStrapiMedia(banner?.backgroundImage?.url)}
                          width={banner?.backgroundImage?.width}
                          height={banner?.backgroundImage?.height}
                          alt={banner?.backgroundImage?.name}
                          className={collectionStyles.collectionImage}
                        />
                        <span
                          className={
                            index === 1
                              ? collectionStyles.labelLeft
                              : collectionStyles.label
                          }
                        >
                          {banner?.ctaLabel}
                        </span>
                      </div>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default CollectionSection;
