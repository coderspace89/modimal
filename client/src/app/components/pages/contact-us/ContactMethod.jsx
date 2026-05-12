"use client";

import React, { useState, useEffect } from "react";
import contactMethodStyles from "./ContactMethod.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";

const ContactMethod = () => {
  const [contactMethodData, setContactMethodData] = useState(null);

  const query = qs.stringify(
    {
      populate: {
        contactMethods: {
          populate: {
            icon: true,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchContactMethods = async () => {
      const res = await fetch(`/api/contact-us-page?${query}`);
      const data = await res.json();
      console.log(data?.data);
      setContactMethodData(data?.data || null);
    };
    fetchContactMethods();
  }, []);

  return (
    <section className={contactMethodStyles.container}>
      <Container>
        <Row>
          {contactMethodData?.contactMethods?.map((contactMethod) => (
            <Col
              key={contactMethod.id}
              lg={4}
              className={contactMethodStyles.contactCard}
            >
              <div>
                {contactMethod?.icon && (
                  <Image
                    src={getStrapiMedia(contactMethod?.icon?.url)}
                    width={contactMethod?.icon.width}
                    height={contactMethod?.icon?.height}
                    alt={contactMethod?.icon?.name}
                  />
                )}
              </div>
              <div>
                <h6>{contactMethod?.title}</h6>
                <p>{contactMethod?.description}</p>
                <button>{contactMethod?.buttonText}</button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ContactMethod;
