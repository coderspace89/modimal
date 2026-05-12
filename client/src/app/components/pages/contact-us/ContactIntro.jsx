"use client";

import React, { useState, useEffect } from "react";
import contactIntroStyles from "./ContactIntro.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const ContactIntro = () => {
  const [contactIntroData, setContactIntroData] = useState(null);
  const pathname = usePathname();

  const formattedCrumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((part) =>
      part
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    );

  const query = qs.stringify(
    {
      fields: ["title", "introText"],
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchContactIntro = async () => {
      const res = await fetch(`/api/contact-us-page?${query}`);
      const data = await res.json();
      console.log(data?.data);
      setContactIntroData(data?.data || null);
    };
    fetchContactIntro();
  }, []);

  return (
    <section className={contactIntroStyles.container}>
      <Container>
        <Row>
          <Col>
            <div className={contactIntroStyles.breadcrumbsContainer}>
              <Breadcrumb>
                <Breadcrumb.Item
                  href="/"
                  className={contactIntroStyles.breadcrumbsLink}
                >
                  Home
                </Breadcrumb.Item>
                {formattedCrumbs.map((item) => (
                  <Breadcrumb.Item
                    key={item}
                    href={pathname}
                    active
                    className={contactIntroStyles.breadcrumbsText}
                  >
                    {item}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
            <div className={contactIntroStyles.titleContainer}>
              <h3 className={contactIntroStyles.title}>
                {contactIntroData?.title}
              </h3>
            </div>
            <div className={contactIntroStyles.markdownContainer}>
              <ReactMarkdown>{contactIntroData?.introText}</ReactMarkdown>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactIntro;
