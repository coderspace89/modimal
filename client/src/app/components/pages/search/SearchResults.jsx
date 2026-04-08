"use client";
import React, { useState, useEffect } from "react";
import { useSearch } from "@/context/SearchContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SearchResults = () => {
  const { strapiQuery } = useSearch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?${strapiQuery}`);
        const data = await res.json();
        setProducts(data?.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [strapiQuery]); // Re-fetch whenever query changes

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Row>
        <Col>
          <p>{products.length} products found</p>
        </Col>
      </Row>
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} lg={6}>
            {/* Your ProductCard component */}
            <div>{product.name}</div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchResults;
