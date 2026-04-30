"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Breadcrumb, Form } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoChevronBackSharp } from "react-icons/io5";
import qs from "qs";
import infoFormStyles from "./InfoForm.module.css";

const InfoForm = () => {
  const router = useRouter();
  const [infoFormData, setInfoFormData] = useState(null);
  const [form, setForm] = useState({
    email: "",
    emailOptIn: false,
    country: "PK",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    postalCode: "",
    city: "",
    phone: "",
    saveInfo: false,
  });

  // Fetch Page Data
  useEffect(() => {
    const fetchInfoFormData = async () => {
      const query = qs.stringify(
        { populate: { info: true } },
        { encodeValuesOnly: true },
      );
      try {
        const res = await fetch(`/api/checkout-page?${query}`);
        const data = await res.json();
        setInfoFormData(data?.data || null);
      } catch (error) {
        console.error("Failed to fetch form data", error);
      }
    };
    fetchInfoFormData();
  }, []);

  // Generic Change Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/checkout/shipping");
  };

  // Field Configuration
  // "key" matches the state object keys
  const fieldConfig = useMemo(() => {
    const info = infoFormData?.info;
    if (!info) return [];

    return [
      {
        key: "email",
        label: info.emailLabel,
        type: "email",
        col: 12,
        section: "contact",
      },
      {
        key: "emailOptIn",
        label: info.emailOffersText,
        type: "checkbox",
        col: 12,
        section: "contact",
      },
      {
        key: "country",
        label: info.countryLabel,
        type: "select",
        col: 12,
        section: "shipping",
      },
      {
        key: "firstName",
        label: info.firstNameLabel,
        type: "text",
        col: 6,
        section: "shipping",
      },
      {
        key: "lastName",
        label: info.lastNameLabel,
        type: "text",
        col: 6,
        section: "shipping",
      },
      {
        key: "company",
        label: info.companyLabel,
        type: "text",
        col: 12,
        section: "shipping",
      },
      {
        key: "address",
        label: info.addressLabel,
        type: "text",
        col: 12,
        section: "shipping",
      },
      {
        key: "apartment",
        label: info.apartmentLabel,
        type: "text",
        col: 12,
        section: "shipping",
      },
      {
        key: "postalCode",
        label: info.postalCodeLabel,
        type: "text",
        col: 6,
        section: "shipping",
      },
      {
        key: "city",
        label: info.cityLabel,
        type: "text",
        col: 6,
        section: "shipping",
      },
      {
        key: "phone",
        label: info.phoneLabel,
        type: "text",
        col: 12,
        section: "shipping",
      },
      {
        key: "saveInfo",
        label: info.saveInfoText,
        type: "checkbox",
        col: 12,
        section: "shipping",
      },
    ];
  }, [infoFormData]);

  if (!infoFormData) return <div>Loading...</div>;

  return (
    <section className={infoFormStyles.container}>
      <Container>
        <Row>
          <Col>
            {/* Breadcrumbs */}
            <Breadcrumb
              className={`${infoFormStyles.breadcrumbsContainer} d-lg-block d-md-block d-none`}
            >
              {infoFormData.breadcrumbSteps?.map((step, idx) => (
                <Breadcrumb.Item
                  key={step.text}
                  href={step.link}
                  active={idx === 1}
                  className={
                    idx === 1
                      ? infoFormStyles.breadcrumbsText
                      : infoFormStyles.breadcrumbsLink
                  }
                >
                  {step.text}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>

            {/* Header */}
            <div className="d-flex align-items-baseline justify-content-between">
              <h5 className={infoFormStyles.contactTitle}>
                {infoFormData.info?.contactSectionTitle}
              </h5>
              <p className={infoFormStyles.loginText}>
                {infoFormData.info?.loginPromptText}
                <Link
                  href={infoFormData.info?.loginLinkUrl || "/login"}
                  className="ms-1"
                >
                  {infoFormData.info?.loginLinkText}
                </Link>
              </p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Row>
                {fieldConfig.map((field) => (
                  <React.Fragment key={field.key}>
                    {/* Inject Shipping Section Header */}
                    {field.key === "country" && (
                      <Col
                        xs={12}
                        className={infoFormStyles.shippingTitleContainer}
                      >
                        <h5 className={infoFormStyles.shippingTitle}>
                          {infoFormData.info?.shippingSectionTitle}
                        </h5>
                      </Col>
                    )}

                    <Col lg={field.col} className="mb-2">
                      {field.type === "checkbox" ? (
                        <Form.Check
                          label={field.label}
                          name={field.key}
                          id={field.key}
                          checked={form[field.key]}
                          onChange={handleChange}
                          className={infoFormStyles.formCheck}
                        />
                      ) : field.type === "select" ? (
                        <Form.Select
                          name={field.key}
                          value={form[field.key]}
                          onChange={handleChange}
                          className={infoFormStyles.formInput}
                        >
                          <option value="">{field.label}</option>
                          <option value="PK">Pakistan</option>
                          <option value="US">United States</option>
                        </Form.Select>
                      ) : (
                        <Form.Control
                          placeholder={field.label}
                          name={field.key}
                          type={field.type}
                          value={form[field.key]}
                          onChange={handleChange}
                          className={infoFormStyles.formInput}
                          required={
                            field.key !== "company" && field.key !== "apartment"
                          }
                        />
                      )}
                    </Col>
                  </React.Fragment>
                ))}
              </Row>

              {/* Action Buttons */}
              <div className={infoFormStyles.formBtnContainer}>
                <Link
                  href="/shopping-cart"
                  className={infoFormStyles.returnLink}
                >
                  <IoChevronBackSharp size={24} color="#5A6D57" />
                  {infoFormData.info?.returnToCartText}
                </Link>
                <button type="submit" className={infoFormStyles.continueBtn}>
                  {infoFormData.info?.continueToShippingText}
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default InfoForm;
