import React from "react";
import CartItems from "@/app/components/pages/shopping-cart/CartItems";
import CartSummary from "../components/pages/shopping-cart/CartSummary";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const page = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={6}>
            <CartItems />
          </Col>
          <Col lg={6}>
            <CartSummary />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default page;
