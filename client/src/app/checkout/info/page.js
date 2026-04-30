import React from "react";
import InfoForm from "@/app/components/pages/checkout/info/InfoForm";
import CheckoutCart from "@/app/components/pages/checkout/info/CheckoutCart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const page = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={7} className="order-lg-1 order-md-1 order-2">
            <InfoForm />
          </Col>
          <Col lg={5} className="order-lg-2 order-md-2 order-1">
            <CheckoutCart />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default page;
