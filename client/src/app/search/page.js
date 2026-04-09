import React from "react";
import SearchForm from "../components/pages/search/SearchForm";
import SearchFilters from "../components/pages/search/SearchFilters";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchResults from "../components/pages/search/SearchResults";

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const filters = params.filters;
  console.log(filters);
  return (
    <section>
      <Container>
        <Row>
          <Col lg={12}>
            <SearchForm filters={filters} />
          </Col>
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
