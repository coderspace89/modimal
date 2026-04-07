"use client";

import React, { useState, useEffect } from "react";
import searchFilterStyles from "./SearchFilters.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";

const SearchFilters = () => {
  const [sizeOptions, setSizeOptions] = useState(null);
  const [colorOptions, setColorOptions] = useState(null);
  const [collectionOptions, setCollectionOptions] = useState(null);
  const [fabricOptions, setFabricOptions] = useState(null);

  const sortOptions = [
    { label: "Featured", value: "featured" }, // custom logic
    { label: "Best Seller", value: "bestSeller" }, // custom logic
    { label: "Price: Low To High", value: "price:asc" }, // Strapi sort
    { label: "Price: High To Low", value: "price:desc" }, // Strapi sort
  ];

  const filtersQuery = qs.stringify(
    {
      populate: "*",
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchSizes = async () => {
      const res = await fetch(`/api/sizes?${filtersQuery}`);
      const data = await res.json();
      console.log(data?.data);
      setSizeOptions(data?.data || null);
    };
    fetchSizes();
  }, []);

  useEffect(() => {
    const fetchColors = async () => {
      const res = await fetch(`/api/colors?${filtersQuery}`);
      const data = await res.json();
      console.log(data?.data);
      setColorOptions(data?.data || null);
    };
    fetchColors();
  }, []);

  useEffect(() => {
    const fetchCollections = async () => {
      const res = await fetch(`/api/collections?${filtersQuery}`);
      const data = await res.json();
      console.log(data?.data);
      setCollectionOptions(data?.data || null);
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    const fetchFabrics = async () => {
      const res = await fetch(`/api/fabrics?${filtersQuery}`);
      const data = await res.json();
      console.log(data?.data);
      setFabricOptions(data?.data || null);
    };
    fetchFabrics();
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col>1 of 1</Col>
        </Row>
      </Container>
    </section>
  );
};

export default SearchFilters;
