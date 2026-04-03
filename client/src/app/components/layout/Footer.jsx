"use client";

import React, { useState, useEffect } from "react";
import footerStyles from "./Footer.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
          // Target the 'footer' component within the 'Global' single type
          populate: {
            copyrightIcon: true, // Populate the media for the copyright icon
            footerNavigation: {
              // Populate the repeatable 'footerNavigation' sections
              populate: {
                navLinks: true, // Populate the repeatable 'navLinks' within each section
              },
            },
            socialMediaLinks: {
              // Populate the repeatable 'socialMediaLinks'
              populate: ["icon"], // Populate the media for the 'icon' within each social link
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

  return <div>Footer</div>;
};

export default Footer;
