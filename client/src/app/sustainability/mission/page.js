import React from "react";
import SustainabilityHero from "@/app/components/pages/sustainability/mission/SustainabilityHero";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextBlock from "@/app/components/pages/sustainability/mission/TextBlock";
import PillarsBlock from "@/app/components/pages/sustainability/mission/PillarsBlock";
import ImageGrid from "@/app/components/pages/sustainability/mission/ImageGrid";
import QuoteBlock from "@/app/components/pages/sustainability/mission/QuoteBlock";
import PeopleGallery from "@/app/components/pages/sustainability/mission/PeopleGallery";

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
          <Col lg={12}>
            <TextBlock />
          </Col>
          <Col lg={12}>
            <PillarsBlock />
          </Col>
          <Col lg={12}>
            <ImageGrid />
          </Col>
          <Col lg={12}>
            <QuoteBlock />
          </Col>
          <Col lg={12}>
            <PeopleGallery />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default page;
