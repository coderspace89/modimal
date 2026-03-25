"use client";

import React, { useState, useEffect } from "react";
import headerStyles from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import qs from "qs";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const [navigationData, setNavigationData] = useState(null);

  const headerQuery = qs.stringify(
    {
      populate: {
        header: {
          populate: {
            logoImage: true,
            headerIcons: {
              populate: {
                icon: true,
              },
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const navigationQuery = qs.stringify(
    {
      sort: ["order:asc"],
      populate: {
        Megamenu: {
          populate: {
            links: true,
            featuredItems: {
              populate: {
                image: true,
              },
            },
          },
        },
      },
      filters: {
        parent: {
          $null: true, // only top-level nav items
        },
      },
    },
    { encodeValuesOnly: true },
  );

  // fetching header data

  useEffect(() => {
    const fetchHeader = async () => {
      const response = await fetch(`/api/global?${headerQuery}`);
      const data = await response.json();
      console.log(data?.data?.header);
      setHeaderData(data?.data?.header);
    };
    fetchHeader();
  }, []);

  // fetching navigation + mega menu

  useEffect(() => {
    const fetchNavigation = async () => {
      const response = await fetch(`/api/navigation-items?${navigationQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setNavigationData(data?.data);
    };
    fetchNavigation();
  }, []);

  return (
    <section>
      <div className={headerStyles.topbarContainer}>
        <span>{headerData?.topbarText}</span>
      </div>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">
            {headerData?.logoImage && (
              <Image
                src={getStrapiMedia(headerData?.logoImage?.url)}
                width={headerData?.logoImage.width}
                height={headerData?.logoImage?.height}
                alt={headerData?.logoImage?.name}
                className={headerStyles.logoImage}
              />
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-auto">
              {navigationData?.map((navItem) => (
                <NavDropdown
                  key={navItem.id}
                  title={navItem.label}
                  id="megamenu-dropdown"
                  className={headerStyles.megamenu}
                >
                  {navItem?.Megamenu?.length > 0 &&
                    navItem?.Megamenu?.map((menuItem) => (
                      <div key={menuItem.id} className={headerStyles.megacol}>
                        <h4>{menuItem?.columnTitle}</h4>
                        {/* Text links */}
                        {menuItem.links?.length > 0 && (
                          <div>
                            {menuItem.links.map((link) => (
                              <NavDropdown.Item key={link.id} href={link.url}>
                                {link.label}
                              </NavDropdown.Item>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </NavDropdown>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

export default Header;
