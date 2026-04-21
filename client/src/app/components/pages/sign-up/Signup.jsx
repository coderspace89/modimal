"use client";

import React, { useState, useEffect } from "react";
import signupStyles from "./Signup.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";
import Form from "react-bootstrap/Form";
import { signup } from "@/app/actions/signup";
import { useActionState } from "react";

const Signup = () => {
  const [signupData, setSignupData] = useState(null);
  const [state, action, pending] = useActionState(signup, undefined);

  const signupQuery = qs.stringify(
    {
      populate: {
        heroImage: true,
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchSignupData = async () => {
      const res = await fetch(`/api/register-page?${signupQuery}`);
      const data = await res.json();
      console.log(data?.data);
      setSignupData(data?.data || null);
    };
    fetchSignupData();
  }, []);

  const formFields = [
    { id: 1, label: "First Name", name: "firstName", type: "text" },
    { id: 2, label: "Last Name", name: "lastName", type: "text" },
    { id: 3, label: "Email", name: "email", type: "email" },
    { id: 4, label: "Password", name: "password", type: "password" },
  ];

  return (
    <section className={signupStyles.container}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div>
              {signupData?.heroImage && (
                <Image
                  src={getStrapiMedia(signupData?.heroImage?.url)}
                  width={signupData?.heroImage?.width}
                  height={signupData?.heroImage?.height}
                  alt={signupData?.heroImage?.name}
                  className={signupStyles.heroImage}
                />
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="text-center">
              <h2>{signupData?.title}</h2>
            </div>
            <div>
              <Form action={action}>
                {formFields?.map((formField) => (
                  <Form.Group
                    className="mb-3"
                    controlId={formField.id}
                    key={formField.id}
                  >
                    <Form.Control
                      name={formField.name}
                      type={formField.type}
                      placeholder={formField.label}
                    />
                    {/* Show validation errors if they exist */}
                    {state?.errors?.[formField.name] && (
                      <p className="text-danger small">
                        {state.errors[formField.name]}
                      </p>
                    )}
                  </Form.Group>
                ))}
                <button type="submit" disabled={pending}>
                  {pending ? "Creating Account..." : "Sign Up"}
                </button>
                {state?.message && (
                  <p className="text-danger">{state.message}</p>
                )}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Signup;
