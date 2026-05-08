import React from "react";
import SustainabilityHero from "@/app/components/pages/sustainability/mission/SustainabilityHero";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextBlock from "@/app/components/pages/sustainability/mission/TextBlock";

const page = () => {
  return (
    <section>
      <Container fluid className="p-0 m-0">
        <Row>
          <Col lg={12}>
            <SustainabilityHero />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <TextBlock />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default page;
