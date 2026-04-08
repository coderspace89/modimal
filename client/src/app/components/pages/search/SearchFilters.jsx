"use client";

import React, { useState, useEffect } from "react";
import searchFilterStyles from "./SearchFilters.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { useSearch } from "@/context/SearchContext";

const SearchFilters = () => {
  const [sizeOptions, setSizeOptions] = useState(null);
  const [colorOptions, setColorOptions] = useState(null);
  const [collectionOptions, setCollectionOptions] = useState(null);
  const [fabricOptions, setFabricOptions] = useState(null);
  // const [selectedFilters, setSelectedFilters] = useState([]);

  // Get everything from context now
  const { selectedFilters, handleFilterChange, removeFilter, clearAll } =
    useSearch();

  const sortOptions = [
    { label: "Featured", value: "featured" }, // custom logic
    { label: "Best Seller", value: "bestSeller" }, // custom logic
    { label: "Price: Low To High", value: "price:asc" }, // Strapi sort
    { label: "Price: High To Low", value: "price:desc" }, // Strapi sort
  ];

  // const filtersQuery = qs.stringify(
  //   {
  //     populate: "*",
  //   },
  //   { encodeValuesOnly: true },
  // );

  // useEffect(() => {
  //   const fetchSizes = async () => {
  //     const res = await fetch(`/api/sizes?${filtersQuery}`);
  //     const data = await res.json();
  //     console.log(data?.data);
  //     setSizeOptions(data?.data || null);
  //   };
  //   fetchSizes();
  // }, []);

  // useEffect(() => {
  //   const fetchColors = async () => {
  //     const res = await fetch(`/api/colors?${filtersQuery}`);
  //     const data = await res.json();
  //     console.log(data?.data);
  //     setColorOptions(data?.data || null);
  //   };
  //   fetchColors();
  // }, []);

  // useEffect(() => {
  //   const fetchCollections = async () => {
  //     const res = await fetch(`/api/collections?${filtersQuery}`);
  //     const data = await res.json();
  //     console.log(data?.data);
  //     setCollectionOptions(data?.data || null);
  //   };
  //   fetchCollections();
  // }, []);

  // useEffect(() => {
  //   const fetchFabrics = async () => {
  //     const res = await fetch(`/api/fabrics?${filtersQuery}`);
  //     const data = await res.json();
  //     console.log(data?.data);
  //     setFabricOptions(data?.data || null);
  //   };
  //   fetchFabrics();
  // }, []);

  // Your useEffects to fetch options stay the same...
  useEffect(() => {
    const fetchAll = async () => {
      const [sizes, colors, collections, fabrics] = await Promise.all([
        fetch(`/api/sizes`).then((r) => r.json()),
        fetch(`/api/colors`).then((r) => r.json()),
        fetch(`/api/collections`).then((r) => r.json()),
        fetch(`/api/fabrics`).then((r) => r.json()),
      ]);
      setSizeOptions(sizes?.data || null);
      setColorOptions(colors?.data || null);
      setCollectionOptions(collections?.data || null);
      setFabricOptions(fabrics?.data || null);
    };
    fetchAll();
  }, []);

  // const handleFilterChange = (e, label, type, id) => {
  //   const isChecked = e.target.checked;

  //   setSelectedFilters((prev) => {
  //     if (isChecked) {
  //       // Add the new filter to the existing array
  //       return [...prev, { id, label, type }];
  //     } else {
  //       // Remove only the specific item matching both ID AND Type
  //       return prev.filter(
  //         (filter) => !(filter.id === id && filter.type === type),
  //       );
  //     }
  //   });
  // };

  // const removeFilter = (id, type) => {
  //   setSelectedFilters((prev) =>
  //     prev.filter((f) => !(f.id === id && f.type === type)),
  //   );
  // };

  // const clearAll = () => setSelectedFilters([]);

  return (
    <section>
      <Container>
        <Row>
          <Col>
            <div>
              <h3 className={searchFilterStyles.filtersTitle}>filters</h3>
            </div>
            {/* Selected Filters Section */}
            {selectedFilters.length > 0 && (
              <div className="mb-4">
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {selectedFilters.map((filter) => (
                    <div
                      /* Combine type and id to ensure the key is globally unique */
                      key={`${filter.type}-${filter.id}`}
                      className={searchFilterStyles.filterBadge}
                    >
                      {filter.label}
                      <span
                        className={`ms-2 ${searchFilterStyles["cursor-pointer"]}`}
                        onClick={() => removeFilter(filter.id, filter.type)}
                      >
                        ✕
                      </span>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <button
                    onClick={clearAll}
                    className={searchFilterStyles.clearAllBtn}
                  >
                    Clear All Filters
                  </button>
                  <button className={searchFilterStyles.appliedBtn}>
                    Applied Filters ({selectedFilters.length})
                  </button>
                </div>
              </div>
            )}

            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Sort By</Accordion.Header>
                <Accordion.Body>
                  {sortOptions?.map((sortOption) => (
                    <Form.Check
                      aria-label={sortOption.label}
                      label={sortOption.label}
                      value={sortOption.value}
                      key={sortOption.label}
                      className={searchFilterStyles.formCheck}
                      checked={selectedFilters.some(
                        (f) =>
                          f.label === sortOption.label && f.type === "sort",
                      )}
                      onChange={(e) =>
                        handleFilterChange(
                          e,
                          sortOption.label,
                          "sort",
                          sortOption.value,
                        )
                      }
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Size</Accordion.Header>
                <Accordion.Body>
                  {sizeOptions?.map((sizeOption) => (
                    <Form.Check
                      aria-label={sizeOption.name}
                      label={sizeOption.name}
                      value={sizeOption.name}
                      key={sizeOption.id}
                      className={searchFilterStyles.formCheck}
                      checked={selectedFilters.some(
                        (f) => f.id === sizeOption.id && f.type === "size",
                      )}
                      onChange={(e) =>
                        handleFilterChange(
                          e,
                          sizeOption.name,
                          "size",
                          sizeOption.id,
                        )
                      }
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Color</Accordion.Header>
                <Accordion.Body>
                  {colorOptions?.map((colorOption) => (
                    <Form.Check
                      key={colorOption.id}
                      type="checkbox"
                      className={`${searchFilterStyles.formCheck} d-flex align-items-center gap-2`}
                    >
                      <Form.Check.Input
                        type="checkbox"
                        value={colorOption.colorCode}
                        checked={selectedFilters.some(
                          (f) => f.id === colorOption.id && f.type === "color",
                        )}
                        onChange={(e) =>
                          handleFilterChange(
                            e,
                            colorOption.colorName,
                            "color",
                            colorOption.id,
                          )
                        }
                      />
                      <span
                        style={{ backgroundColor: colorOption.colorCode }}
                        className={searchFilterStyles.colorSwatch}
                      ></span>
                      <Form.Check.Label>
                        {colorOption.colorName}
                      </Form.Check.Label>
                    </Form.Check>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Collection</Accordion.Header>
                <Accordion.Body>
                  {collectionOptions?.map((collectionOption) => (
                    <Form.Check
                      aria-label={collectionOption.name}
                      label={collectionOption.name}
                      value={collectionOption.name}
                      key={collectionOption.id}
                      className={searchFilterStyles.formCheck}
                      checked={selectedFilters.some(
                        (f) =>
                          f.id === collectionOption.id &&
                          f.type === "collection",
                      )}
                      onChange={(e) =>
                        handleFilterChange(
                          e,
                          collectionOption.name,
                          "collection",
                          collectionOption.id,
                        )
                      }
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Fabric</Accordion.Header>
                <Accordion.Body>
                  {fabricOptions?.map((fabricOption) => (
                    <Form.Check
                      aria-label={fabricOption.name}
                      label={fabricOption.name}
                      value={fabricOption.name}
                      key={fabricOption.id}
                      className={searchFilterStyles.formCheck}
                      checked={selectedFilters.some(
                        (f) => f.id === fabricOption.id && f.type === "fabric",
                      )}
                      onChange={(e) =>
                        handleFilterChange(
                          e,
                          fabricOption.name,
                          "fabric",
                          fabricOption.id,
                        )
                      }
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SearchFilters;
