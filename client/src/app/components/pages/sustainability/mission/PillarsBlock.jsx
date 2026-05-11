"use client";

import React, { useState, useEffect } from "react";
import pillarsBlockStyles from "./PillarsBlock.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

const PillarsBlock = () => {
  const [pillarsBlockData, setPillarsBlockData] = useState(null);

  const query = qs.stringify(
    {
      populate: {
        pillarsBlock: {
          on: {
            "blocks.pillars-wrapper": {
              populate: "*",
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
    const fetchPillarsBlock = async () => {
      const res = await fetch(`/api/sustainability-page?${query}`);
      const data = await res.json();
      console.log(data?.data?.pillarsBlock?.[0]);
      setPillarsBlockData(data?.data.pillarsBlock?.[0] || null);
    };
    fetchPillarsBlock();
  }, []);

  return (
    <section className={pillarsBlockStyles.container}>
      <Container className="p-0">
        <div className={pillarsBlockStyles.sectionTitleContainer}>
          <h4 className={pillarsBlockStyles.sectionTitle}>
            {pillarsBlockData?.sectionTitle}
          </h4>
        </div>
        <Row className="d-lg-flex d-none">
          {pillarsBlockData?.pillars?.map((pillar) => (
            <Col
              lg={6}
              key={pillar?.id}
              className={pillarsBlockStyles.pillarColumn}
            >
              <div>
                <h5 className={pillarsBlockStyles.pillarTitle}>
                  {pillar?.title}
                </h5>
                <p className={pillarsBlockStyles.pillarText}>
                  {pillar?.description}
                </p>
              </div>
            </Col>
          ))}
          <Col lg={12}>
            <div>
              <p className={pillarsBlockStyles.pillarText}>
                {pillarsBlockData?.content}
              </p>
            </div>
          </Col>
        </Row>
        <Row className="d-lg-none d-block">
          <Col>
            <Accordion flush id="sustainability-accordion">
              {pillarsBlockData?.pillars?.map((pillar) => (
                <Accordion.Item eventKey={pillar?.id} key={pillar?.id}>
                  <Accordion.Header className={pillarsBlockStyles.pillarTitle}>
                    {pillar?.title}
                  </Accordion.Header>
                  <Accordion.Body className={pillarsBlockStyles.pillarText}>
                    {pillar?.description}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
          <Col lg={12}>
            <div>
              <p className={pillarsBlockStyles.pillarText}>
                {pillarsBlockData?.content}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PillarsBlock;
