"use client";

import React, { useState, useEffect } from "react";
import contactFormStyles from "./ContactForm.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FiMail } from "react-icons/fi";

const ContactForm = () => {
  const [contactFormLabels, setContactFormLabels] = useState(null);

  const query = qs.stringify(
    {
      fields: [
        "formSectionTitle",
        "formSubtitle",
        "subjectOptions",
        "privacyCheckboxText",
        "privacyPolicyLink",
        "supportEmail",
        "supportPhone",
        "responseTimeText",
      ],
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchContactForm = async () => {
      const res = await fetch(`/api/contact-us-page?${query}`);
      const data = await res.json();
      console.log(data?.data);
      setContactFormLabels(data?.data || null);
    };
    fetchContactForm();
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    orderNumber: "",
    message: "",
    agreed: false,
  });
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, to: contactFormLabels?.supportEmail }),
    });

    setStatus(res.ok ? "success" : "error");
  }

  return (
    <section className={contactFormStyles.container}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div>
              <div className={contactFormStyles.formSectionTitleContainer}>
                <span className="me-2">
                  <FiMail color="#0C0C0C" size={24} />
                </span>
                <span>
                  <h4 className={contactFormStyles.formSectionTitle}>
                    {contactFormLabels?.formSectionTitle}
                  </h4>
                </span>
              </div>
              <div className={contactFormStyles.formSubtitleContainer}>
                <h5 className={contactFormStyles.formSubtitle}>
                  {contactFormLabels?.formSubtitle}
                </h5>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="row">
                <div className="col-12 mb-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    className={contactFormStyles.formInput}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    className={contactFormStyles.formInput}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <select
                    value={formData.subject}
                    className={contactFormStyles.formInput}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                  >
                    <option value="">Subject</option>
                    {contactFormLabels?.subjectOptions?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 mb-3">
                  <input
                    type="text"
                    placeholder="Order Number"
                    className={contactFormStyles.formInput}
                    value={formData.orderNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, orderNumber: e.target.value })
                    }
                  />
                </div>
                <div className="col-12 mb-3">
                  <textarea
                    placeholder="Message"
                    className={contactFormStyles.formInput}
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.agreed}
                      className={contactFormStyles.formCheck}
                      onChange={(e) =>
                        setFormData({ ...formData, agreed: e.target.checked })
                      }
                      required
                    />
                    <span className={contactFormStyles.checkboxText}>
                      {contactFormLabels?.privacyCheckboxText}
                    </span>
                  </label>
                </div>
                <div className="col-12 mb-3 text-end">
                  <button
                    className={contactFormStyles.formBtn}
                    type="submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending..." : "Send"}
                  </button>
                  {status === "success" && (
                    <p className="success">
                      Message sent! We'll reply within 1-2 business days.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="error">
                      Something went wrong. Email us directly.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactForm;
