"use client";

import React, { useState, useEffect } from "react";
import materialsPageStyles from "./MaterialsPage.module.css";
import qs from "qs";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { usePathname } from "next/navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const MaterialsPage = () => {
  const [materialsPageData, setMaterialsPageData] = useState(null);
  const pathname = usePathname();

  const breadCrumbs = pathname.split("/").filter((part) => part !== "");

  const query = qs.stringify(
    {
      populate: {
        materials: {
          populate: "*",
        },
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchMaterialsPage = async () => {
      const res = await fetch(`/api/materials-page?${query}`);
      const data = await res.json();
      console.log(data?.data);
      setMaterialsPageData(data?.data || null);
    };
    fetchMaterialsPage();
  }, []);

  return (
    <section className={materialsPageStyles.container}>
      <Container>
        <div className={materialsPageStyles.breadcrumbsContainer}>
          <Breadcrumb>
            <Breadcrumb.Item
              href="/"
              className={materialsPageStyles.breadcrumbsLink}
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
                    ? materialsPageStyles.breadcrumbsLink
                    : materialsPageStyles.breadcrumbsText
                }
              >
                {item}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
        <Row>
          <Col lg={12} className={materialsPageStyles.introContainer}>
            <div>
              <h2 className={materialsPageStyles.title}>
                {materialsPageData?.title}
              </h2>
              <div className={materialsPageStyles.markdownContainer}>
                <ReactMarkdown>{materialsPageData?.introText}</ReactMarkdown>
              </div>
            </div>
          </Col>
          <Col lg={12}>
            {materialsPageData?.materials?.map((material, index) => (
              <Row
                key={material.id}
                className={`${materialsPageStyles.materialsRow} align-items-center`}
              >
                <Col
                  lg={5}
                  className={
                    index === 1 || index === 3 ? "order-lg-2" : "order-lg-1"
                  }
                >
                  {material?.image && (
                    <Image
                      src={getStrapiMedia(material?.image?.url)}
                      width={material.image.width}
                      height={material.image.height}
                      alt={material.image.name}
                      className={materialsPageStyles.materialImage}
                    />
                  )}
                </Col>
                <Col
                  lg={7}
                  className={
                    index !== 1 || index !== 3 ? "order-lg-1" : "order-lg-2"
                  }
                >
                  <div>
                    <h4 className={materialsPageStyles.materialName}>
                      {material?.name}
                    </h4>
                    <p className={materialsPageStyles.materialText}>
                      {material?.description}
                    </p>
                  </div>
                </Col>
              </Row>
            ))}
          </Col>
          <Col lg={12}>
            <div className={materialsPageStyles.markdownContainer}>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={materialsPageStyles.markdownLink}
                    />
                  ),
                }}
              >
                {materialsPageData?.closingText.replace(
                  "Here.",
                  `[Here](${materialsPageData?.reportLink})`,
                )}
              </ReactMarkdown>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MaterialsPage;
