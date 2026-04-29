import React from "react";
import InfoForm from "@/app/components/pages/checkout/info/InfoForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const page = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={7}>
            <InfoForm />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default page;
