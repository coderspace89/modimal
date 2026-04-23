"use client";

import React, { useState, useEffect } from "react";
import loginStyles from "./Login.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";
import Form from "react-bootstrap/Form";
import { login } from "@/app/actions/login";
import { useActionState } from "react";
import Link from "next/link";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const Login = () => {
  const [loginData, setLoginData] = useState(null);
  const [state, action, pending] = useActionState(login, undefined);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

  const loginQuery = qs.stringify(
    {
      populate: {
        heroImage: true,
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchLoginData = async () => {
      const res = await fetch(`/api/login-page?${loginQuery}`);
      const data = await res.json();
      console.log(data?.data);
      setLoginData(data?.data || null);
    };
    fetchLoginData();
  }, []);

  const formFields = [
    { id: 1, label: "Email", name: "email", type: "email" },
    { id: 2, label: "Password", name: "password", type: "password" },
  ];

  const handleSocialLogin = async (provider) => {
    setIsSocialLoading(true);
    await signIn(provider, { redirectTo: "/" });
  };

  return (
    <section className={loginStyles.container}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-lg-0 mb-3">
            <div>
              {loginData?.heroImage && (
                <Image
                  src={getStrapiMedia(loginData?.heroImage?.url)}
                  width={loginData?.heroImage?.width}
                  height={loginData?.heroImage?.height}
                  alt={loginData?.heroImage?.name}
                  className={loginStyles.heroImage}
                />
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="text-center">
              <h2 className={loginStyles.signupTitle}>{loginData?.title}</h2>
            </div>
            <div>
              <Form action={action}>
                {formFields?.map((formField) => (
                  <Form.Group
                    className="mb-2"
                    controlId={formField.id}
                    key={formField.id}
                  >
                    <Form.Control
                      name={formField.name}
                      type={formField.type}
                      placeholder={formField.label}
                      className={loginStyles.formInput}
                      isInvalid={!!state?.errors?.[formField.name]}
                    />
                    {/* Show validation errors if they exist */}
                    {state?.errors?.[formField.name] && (
                      <p className="text-danger small">
                        {state.errors[formField.name]}
                      </p>
                    )}
                  </Form.Group>
                ))}
                <div className={loginStyles.forgotLinkContainer}>
                  <Link
                    href="/forgot-password"
                    className={loginStyles.forgotLink}
                  >
                    {loginData?.forgotPasswordText}
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={pending}
                  className={loginStyles.formBtn}
                >
                  {pending ? "Signing in..." : loginData?.buttonText}
                </button>
                {state?.message && (
                  <p className="text-danger">{state.message}</p>
                )}
              </Form>
              <div className="text-center my-3">
                <span className={loginStyles.loginText}>
                  {loginData?.loginText}
                </span>
                <span>
                  <Link
                    href={loginData?.loginLinkUrl || "/login"}
                    className={loginStyles.loginLink}
                  >
                    {loginData?.loginLinkText}
                  </Link>
                </span>
              </div>
              <div className="text-center">
                <p>Or</p>
              </div>
              <div className={loginStyles.socialIconContainer}>
                {/* Apple Login */}
                <button
                  type="button"
                  className="btn p-0 border-0"
                  disabled={isSocialLoading}
                  onClick={() => handleSocialLogin("apple")}
                >
                  <FaApple size={35} color="#202020" />
                </button>

                {/* Google Login */}
                <button
                  type="button"
                  className="btn p-0 border-0"
                  disabled={isSocialLoading}
                  onClick={() => handleSocialLogin("google")}
                >
                  <FcGoogle size={35} />
                </button>

                {/* Facebook Login */}
                <button
                  type="button"
                  className="btn p-0 border-0"
                  disabled={isSocialLoading}
                  onClick={() => handleSocialLogin("facebook")}
                >
                  <FaFacebook color="#1877F2" size={35} />
                </button>
              </div>
              <div className="text-center">
                <p className={loginStyles.termsText}>
                  {loginData?.signupText}{" "}
                  <Link href={loginData?.signupLinkUrl || "/sign-up"}>
                    {loginData?.signupLinkText}
                  </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
