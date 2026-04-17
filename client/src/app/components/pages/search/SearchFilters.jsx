"use client";

import React, { useState, useEffect } from "react";
import searchFilterStyles from "./SearchFilters.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSearch } from "@/context/SearchContext";
import { usePathname } from "next/navigation";

const SearchFilters = () => {
  const [sizeOptions, setSizeOptions] = useState(null);
  const [colorOptions, setColorOptions] = useState(null);
  const [collectionOptions, setCollectionOptions] = useState(null);
  const [fabricOptions, setFabricOptions] = useState(null);

  // Get everything from context now
  const {
    selectedFilters,
    handleFilterChange,
    removeFilter,
    clearAll,
    baseFilters,
  } = useSearch();

  const sortOptions = [
    { label: "Featured", value: "featured" }, // custom logic
    { label: "Best Seller", value: "bestSeller" }, // custom logic
    { label: "Price: Low To High", value: "price:asc" }, // Strapi sort
    { label: "Price: High To Low", value: "price:desc" }, // Strapi sort
  ];

  const pathname = usePathname(); // ADD THIS

  const isPlusSizePage = pathname === "/plus-size";

  // Only show removable filters, not baseFilters
  const removableFilters = selectedFilters.filter(
    (f) => f.type !== "internal", // or any type you use for baseg
  );

  // Your useEffects to fetch options stay the same...
  useEffect(() => {
    const fetchAll = async () => {
      const [sizes, colors, collections, fabrics] = await Promise.all([
        fetch(`/api/sizes?sort=order:asc`).then((r) => r.json()),
        fetch(`/api/colors`).then((r) => r.json()),
        fetch(`/api/collections`).then((r) => r.json()),
        fetch(`/api/fabrics`).then((r) => r.json()),
      ]);

      // Filter sizes based on page
      let filteredSizes = sizes?.data || [];
      if (isPlusSizePage) {
        filteredSizes = filteredSizes.filter((s) => s.isPlusSize === true); // ONLY 1X, 2X, 3X
      } else {
        filteredSizes = filteredSizes.filter((s) => !s.isPlusSize); // ONLY XS, S, M, L, XL
      }

      setSizeOptions(filteredSizes);
      setColorOptions(colors?.data || null);
      setCollectionOptions(collections?.data || null);
      setFabricOptions(fabrics?.data || null);
    };
    fetchAll();
  }, [isPlusSizePage]);

  // offcanvas
  const [showFilters, setShowFilters] = useState(false);

  const handleCloseFilters = () => setShowFilters(false);
  const handleShowFilters = () => setShowFilters(true);

  return (
    <div>
      <section className="d-lg-block d-none">
        <Container>
          <Row>
            <Col>
              <div>
                <h3 className={searchFilterStyles.filtersTitle}>filters</h3>
              </div>
              {/* Selected/Removable Filters Section */}
              {removableFilters.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {removableFilters.map((filter) => (
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
                        type="radio" // Important: sort should be radio
                        name="sort"
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
                            (f) =>
                              f.id === colorOption.id && f.type === "color",
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
                          (f) =>
                            f.id === fabricOption.id && f.type === "fabric",
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
      <section className="d-lg-none d-block">
        <div className={searchFilterStyles.filterHeader}>
          <h3 className={searchFilterStyles.filtersTitle}>
            <span onClick={handleShowFilters}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z"
                  fill="#0C0C0C"
                />
              </svg>
            </span>{" "}
            filters
          </h3>
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
          </div>
        )}
        <Offcanvas
          show={showFilters}
          onHide={handleCloseFilters}
          className="w-100"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className={searchFilterStyles.offcanvasTitle}>
              Filters
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Sort By</Accordion.Header>
                <Accordion.Body>
                  {sortOptions?.map((sortOption) => (
                    <Form.Check
                      type="radio" // Important: sort should be radio
                      name="sort"
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
            {/* Selected Filters Section */}
            {selectedFilters.length > 0 && (
              <div className="mb-4">
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
          </Offcanvas.Body>
        </Offcanvas>
      </section>
    </div>
  );
};

export default SearchFilters;
