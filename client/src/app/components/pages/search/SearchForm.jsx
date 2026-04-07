"use client";

import React, { useState } from "react";
import searchFormStyles from "./SearchForm.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";

const SearchForm = ({ filters }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearchEnter = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.replace(`/search?filters=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className={searchFormStyles.container}>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={onSearchEnter}>
              <div className={searchFormStyles.inputContainer}>
                <svg
                  className={searchFormStyles.searchIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.6687 0C4.77655 0 0 4.77658 0 10.6688C0 16.561 4.77655 21.3376 10.6687 21.3376C13.1626 21.3376 15.4566 20.4819 17.2731 19.0481L21.8573 23.6324C22.3475 24.1225 23.1422 24.1225 23.6324 23.6324C24.1225 23.1422 24.1225 22.3475 23.6324 21.8573L19.0482 17.2731C20.4818 15.4565 21.3375 13.1626 21.3375 10.6688C21.3375 4.77658 16.5609 0 10.6687 0ZM2.51029 10.6688C2.51029 6.16298 6.16295 2.5103 10.6687 2.5103C15.1745 2.5103 18.8272 6.16298 18.8272 10.6688C18.8272 15.1746 15.1745 18.8273 10.6687 18.8273C6.16295 18.8273 2.51029 15.1746 2.51029 10.6688Z"
                    fill="#ADADAD"
                  />
                </svg>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className={searchFormStyles.customSearch}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SearchForm;
