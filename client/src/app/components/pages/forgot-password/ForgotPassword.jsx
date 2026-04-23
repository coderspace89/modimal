"use client";

import React from "react";
import forgotPasswordStyles from "./ForgotPassword.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { forgotPassword } from "@/app/actions/forgot-password";
import Form from "react-bootstrap/Form";
import { useFormStatus } from "react-dom";

const ForgotPassword = () => {
  const { pending } = useFormStatus();
  return (
    <section className={forgotPasswordStyles.container}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6}>
            <div className="text-center">
              <h2 className={forgotPasswordStyles.forgotTitle}>
                enter your email
              </h2>
            </div>
            <Form action={forgotPassword}>
              <Form.Group className="mb-3" controlId="forgotEmail">
                <Form.Control
                  name="email" // <--- CRITICAL: Your action needs this name!
                  type="email"
                  placeholder="Email"
                  className={forgotPasswordStyles.formInput}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={pending}
                  className={forgotPasswordStyles.formBtn}
                >
                  {pending ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ForgotPassword;
