import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ShopAllHero from "../components/pages/shop-all/ShopAllHero";
import SearchFilters from "../components/pages/search/SearchFilters";
import SearchResults from "../components/pages/search/SearchResults";

const page = () => {
  return (
    <section>
      <Container fluid className="p-0 m-0">
        <Row>
          <Col lg={12}>
            <ShopAllHero />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg={4}>
            <SearchFilters />
          </Col>
          <Col lg={8}>
            <SearchResults />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default page;
