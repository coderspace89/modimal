"use client";

import React, { useState, useEffect } from "react";
import faqStyles from "./FaqAccordion.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Accordion from "react-bootstrap/Accordion";

const FaqAccordion = () => {
  const [faqsData, setFaqsData] = useState(null);
  const pathname = usePathname();
  const breadCrumbs = pathname.split("/").filter((part) => part !== "");

  const query = qs.stringify(
    {
      populate: {
        faqs: {
          populate: "*",
        },
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchFaqsData = async () => {
      const res = await fetch(`/api/faqs-page?${query}`);
      const data = await res.json();
      console.log(data?.data);
      setFaqsData(data?.data || null);
    };
    fetchFaqsData();
  }, []);

  return (
    <section className={faqStyles.container}>
      <Container>
        <div className={faqStyles.breadcrumbsContainer}>
          <Breadcrumb>
            <Breadcrumb.Item href="/" className={faqStyles.breadcrumbsLink}>
              Home
            </Breadcrumb.Item>
            {breadCrumbs.map((item) => (
              <Breadcrumb.Item
                active
                key={item}
                className={faqStyles.breadcrumbsText}
              >
                {item}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className={faqStyles.sectionTitleContainer}>
              <h2 className={faqStyles.sectionTitle}>{faqsData?.title}</h2>
            </div>
            <div>
              <Accordion flush id="faqs-accordion">
                {faqsData?.faqs?.map((faq) => (
                  <Accordion.Item eventKey={faq?.id} key={faq?.id}>
                    <Accordion.Header className={faqStyles.faqTitle}>
                      {faq?.question}
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className={faqStyles.faqText}>
                        <ReactMarkdown>{faq?.answer}</ReactMarkdown>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FaqAccordion;
