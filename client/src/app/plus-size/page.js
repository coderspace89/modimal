import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SearchProvider } from "@/context/SearchContext";
import SearchFilters from "../components/pages/search/SearchFilters";
import SearchResults from "../components/pages/search/SearchResults";
import PlusSizeHero from "../components/pages/plus-size/PlusSizeHero";

// This filter is locked - user cannot remove it
const baseFilters = {
  sizes: { isPlusSize: { $eq: true } },
};

const page = () => {
  return (
    <section>
      <SearchProvider baseFilters={baseFilters}>
        <Container fluid className="p-0 m-0">
          <Row>
            <Col lg={12}>
              <PlusSizeHero />
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
      </SearchProvider>
    </section>
  );
};

export default page;
