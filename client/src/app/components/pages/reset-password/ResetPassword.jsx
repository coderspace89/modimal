"use client";

import React from "react";
import resetPasswordStyles from "./ResetPassword.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { resetPassword } from "@/app/actions/reset-password";
import { useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  return (
    <section className={resetPasswordStyles.container}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6}>
            <Form action={resetPassword}>
              {/* Ensure code has a fallback to empty string so it's defined */}
              <input type="hidden" name="code" value={code || ""} />

              <Form.Group className="mb-2">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="New Password"
                  required
                  className={resetPasswordStyles.formInput}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Control
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Confirm New Password"
                  required
                  className={resetPasswordStyles.formInput}
                />
              </Form.Group>

              <div className="text-center">
                <button type="submit" className={resetPasswordStyles.formBtn}>
                  Update Password
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ResetPassword;
