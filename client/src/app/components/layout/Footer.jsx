"use client";

import React, { useState, useEffect } from "react";
import footerStyles from "./Footer.module.css";
import Container from "react-bootstrap/Container";
import qs from "qs";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import Link from "next/link";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  const footerQuery = qs.stringify(
    {
      populate: {
        footer: {
          populate: {
            copyrightIcon: true,
            footerNavigation: {
              populate: {
                navLinks: true,
              },
            },
            socialMediaLinks: {
              populate: ["icon"],
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  useEffect(() => {
    const fetchFooter = async () => {
      const response = await fetch(`/api/global?${footerQuery}`);
      const data = await response.json();
      console.log(data?.data?.footer);
      setFooterData(data?.data?.footer);
    };
    fetchFooter();
  }, []);

  return (
    <section className={footerStyles.footerSection}>
      <Container>
        <footer>
          <div className={footerStyles.container}>
            {/* Left Side: Newsletter and Branding */}
            <section className={footerStyles.newsletterSection}>
              <h3 className={footerStyles.newsletterTitle}>
                {footerData?.newsletterTitle}
              </h3>

              <div className={footerStyles.inputWrapper}>
                <input
                  type="email"
                  placeholder={footerData?.newsletterPlaceholder}
                  className={footerStyles.inputField}
                />
                <span style={{ cursor: "pointer" }}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99999 2.66602L7.05999 3.60602L10.78 7.33268H2.66666V8.66602H10.78L7.05999 12.3927L7.99999 13.3327L13.3333 7.99935L7.99999 2.66602Z"
                      fill="#D1D9CF"
                    />
                  </svg>
                </span>
              </div>

              <div className={footerStyles.termsWrapper}>
                <input
                  type="checkbox"
                  className={footerStyles.checkbox}
                  id="privacy-check"
                />
                <label
                  htmlFor="privacy-check"
                  className={footerStyles.termsText}
                >
                  {footerData?.newsLetterTermsText}
                </label>
              </div>
            </section>

            {/* Right Side: Navigation Links */}
            <nav className={footerStyles.navGrid}>
              {footerData?.footerNavigation?.map((section) => (
                <div key={section.id} className={footerStyles.navColumn}>
                  <h4>{section.title}</h4>
                  <ul className={footerStyles.navLinks}>
                    {section.navLinks.map((link) => (
                      <li key={link.id}>
                        <Link href={link.url}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div>
              <div className={footerStyles.socialIcons}>
                {footerData?.socialMediaLinks?.map((social) => (
                  <Link key={social?.id} href={social?.url}>
                    {social.icon && (
                      <Image
                        src={getStrapiMedia(social?.icon?.url)}
                        alt={social?.platform}
                        width={social?.icon?.width}
                        height={social?.icon?.height}
                      />
                    )}
                  </Link>
                ))}
              </div>

              <div className={footerStyles.copyright}>
                {footerData?.copyrightIcon && (
                  <Image
                    src={getStrapiMedia(footerData?.copyrightIcon?.url)}
                    alt={footerData?.copyrightIcon?.name}
                    width={footerData?.copyrightIcon?.width}
                    height={footerData?.copyrightIcon?.height}
                  />
                )}
                <span>{footerData?.copyrightText}</span>
              </div>
            </div>
          </div>

          {/* Floating Chat Icon (Green Box) */}
          <div className={footerStyles.floatingBtn}>
            <svg
              width="56"
              height="48"
              viewBox="0 0 56 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" y="0.5" width="55" height="47" fill="#5A6D57" />
              <rect x="0.5" y="0.5" width="55" height="47" stroke="white" />
              <path
                d="M36 14H20.01C18.91 14 18.01 14.9 18.01 16L18 34L22 30H36C37.1 30 38 29.1 38 28V16C38 14.9 37.1 14 36 14ZM36 28H21.17L20 29.17V16H36V28ZM28 22C29.1 22 30 21.1 30 20C30 18.9 29.1 18 28 18C26.9 18 26 18.9 26 20C26 21.1 26.9 22 28 22ZM32 25.43C32 24.62 31.52 23.9 30.78 23.58C29.93 23.21 28.99 23 28 23C27.01 23 26.07 23.21 25.22 23.58C24.48 23.9 24 24.62 24 25.43V26H32V25.43Z"
                fill="white"
              />
            </svg>
          </div>
        </footer>
      </Container>
    </section>
  );
};

export default Footer;
