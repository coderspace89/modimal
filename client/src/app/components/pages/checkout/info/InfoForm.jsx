"use client";

import React, { useState, useEffect } from "react";
import infoFormStyles from "./InfoForm.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Form from "react-bootstrap/Form";
import Link from "next/link";

const InfoForm = () => {
  const [infoFormData, setInfoFormData] = useState(null);

  const infoFormQuery = qs.stringify(
    {
      populate: {
        info: true,
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchInfoFormData = async () => {
      const res = await fetch(`/api/checkout-page?${infoFormQuery}`);
      const data = await res.json();
      console.log(data?.data);
      setInfoFormData(data?.data || null);
    };
    fetchInfoFormData();
  }, []);

  const formFields = [
    {
      id: 1,
      label: infoFormData?.info?.emailLabel,
      name: infoFormData?.info?.emailLabel,
      type: "email",
    },
    {
      id: 2,
      label: infoFormData?.info?.emailOffersText,
      name: infoFormData?.info?.emailOffersText,
      type: "checkbox",
    },
    {
      id: 3,
      label: infoFormData?.info?.countryLabel,
      name: infoFormData?.info?.countryLabel,
      type: "text",
    },
    {
      id: 4,
      label: infoFormData?.info?.firstNameLabel,
      name: infoFormData?.info?.firstNameLabel,
      type: "text",
    },
    {
      id: 5,
      label: infoFormData?.info?.lastNameLabel,
      name: infoFormData?.info?.lastNameLabel,
      type: "text",
    },
    {
      id: 6,
      label: infoFormData?.info?.companyLabel,
      name: infoFormData?.info?.companyLabel,
      type: "text",
    },
    {
      id: 7,
      label: infoFormData?.info?.addressLabel,
      name: infoFormData?.info?.addressLabel,
      type: "text",
    },
    {
      id: 8,
      label: infoFormData?.info?.apartmentLabel,
      name: infoFormData?.info?.apartmentLabel,
      type: "text",
    },
    {
      id: 9,
      label: infoFormData?.info?.postalCodeLabel,
      name: infoFormData?.info?.postalCodeLabel,
      type: "text",
    },
    {
      id: 10,
      label: infoFormData?.info?.cityLabel,
      name: infoFormData?.info?.cityLabel,
      type: "text",
    },
    {
      id: 11,
      label: infoFormData?.info?.phoneLabel,
      name: infoFormData?.info?.phoneLabel,
      type: "text",
    },
    {
      id: 12,
      label: infoFormData?.info?.saveInfoText,
      name: infoFormData?.info?.saveInfoText,
      type: "checkbox",
    },
  ];

  return (
    <section className={infoFormStyles.container}>
      <Container>
        <Row>
          <Col>
            <div>
              <Breadcrumb className={infoFormStyles.breadcrumbsContainer}>
                {infoFormData?.breadcrumbSteps?.map((breadCrumb, index) => (
                  <Breadcrumb.Item
                    href={breadCrumb.link}
                    key={breadCrumb.text}
                    active={index === 1}
                    className={
                      index === 1
                        ? infoFormStyles.breadcrumbsText
                        : infoFormStyles.breadcrumbsLink
                    }
                  >
                    {breadCrumb.text}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
            <div>
              <div className="d-flex align-items-baseline justify-content-between">
                <h5 className={infoFormStyles.contactTitle}>
                  {infoFormData?.info?.contactSectionTitle}
                </h5>
                <p className={infoFormStyles.loginText}>
                  {infoFormData?.info?.loginPromptText}
                  <span className="ms-1">
                    <Link href={infoFormData?.info?.loginLinkUrl || "/login"}>
                      {infoFormData?.info?.loginLinkText}
                    </Link>
                  </span>
                </p>
              </div>
              <Form>
                <Row>
                  {formFields
                    .filter((field) => field.id === 1)
                    .map((field) => (
                      <Col lg={12} key={field.id} className="mb-2">
                        <Form.Control
                          placeholder={field.label}
                          name={field.name}
                          type={field.type}
                          className={infoFormStyles.formInput}
                        />
                      </Col>
                    ))}
                  {formFields
                    .filter((field) => field.id === 2)
                    .map((field) => (
                      <Col lg={12} key={field.id} className="mb-2">
                        <Form.Check
                          label={field.label}
                          name={field.name}
                          type={field.type}
                          className={infoFormStyles.formCheck}
                        />
                      </Col>
                    ))}
                  <div className={infoFormStyles.shippingTitleContainer}>
                    <h5 className={infoFormStyles.shippingTitle}>
                      {infoFormData?.info?.shippingSectionTitle}
                    </h5>
                  </div>
                  {formFields
                    .filter((field) => field.id > 2 && field.id < 12)
                    .map((field) => (
                      <Col
                        lg={
                          field.id === 4 ||
                          field.id === 5 ||
                          field.id === 9 ||
                          field.id === 10
                            ? 6
                            : 12
                        }
                        key={field.id}
                        className="mb-2"
                      >
                        <Form.Control
                          placeholder={field.label}
                          name={field.name}
                          type={field.type}
                          className={infoFormStyles.formInput}
                        />
                      </Col>
                    ))}
                  {formFields
                    .filter((field) => field.id === 12)
                    .map((field) => (
                      <Col lg={12} key={field.id} className="mb-2">
                        <Form.Check
                          label={field.label}
                          name={field.name}
                          type={field.type}
                          className={infoFormStyles.formCheck}
                        />
                      </Col>
                    ))}
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default InfoForm;
