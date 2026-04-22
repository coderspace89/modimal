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
import Link from "next/link";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const Signup = () => {
  const [signupData, setSignupData] = useState(null);
  const [state, action, pending] = useActionState(signup, undefined);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

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

  const handleSocialLogin = async (provider) => {
    setIsSocialLoading(true);
    await signIn(provider, { redirectTo: "/" });
  };

  return (
    <section className={signupStyles.container}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-lg-0 mb-3">
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
              <h2 className={signupStyles.signupTitle}>{signupData?.title}</h2>
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
                      className={signupStyles.formInput}
                    />
                    {/* Show validation errors if they exist */}
                    {state?.errors?.[formField.name] && (
                      <p className="text-danger small">
                        {state.errors[formField.name]}
                      </p>
                    )}
                  </Form.Group>
                ))}
                <button
                  type="submit"
                  disabled={pending}
                  className={signupStyles.formBtn}
                >
                  {pending ? "Creating Account..." : signupData?.buttonText}
                </button>
                {state?.message && (
                  <p className="text-danger">{state.message}</p>
                )}
              </Form>
              <div className="text-center my-3">
                <span className={signupStyles.loginText}>
                  {signupData?.loginText}
                </span>
                <span>
                  <Link
                    href={signupData?.loginLinkUrl || "/login"}
                    className={signupStyles.loginLink}
                  >
                    {signupData?.loginLinkText}
                  </Link>
                </span>
              </div>
              <div className="text-center">
                <p>Or</p>
              </div>
              <div className={signupStyles.socialIconContainer}>
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
                <p className={signupStyles.termsText}>
                  {signupData?.termsText}{" "}
                  <Link href={signupData?.termsLink || "/terms-and-condition"}>
                    Terms & Conditions
                  </Link>{" "}
                  And{" "}
                  <Link href={signupData?.privacyLink || "/privacy-policy"}>
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Signup;
