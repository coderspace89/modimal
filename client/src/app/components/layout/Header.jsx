"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [openId, setOpenId] = useState(null);

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

  const closeTimeout = useRef(null);

  const handleMouseEnter = (id) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpenId(id);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenId(null);
    }, 500); // 5 seconds
  };

  useEffect(() => {
    return () => clearTimeout(closeTimeout.current);
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
            <header className={headerStyles.headerContainer}>
              <nav className={`${headerStyles.nav} ms-auto me-auto`}>
                <ul className={headerStyles.navlist}>
                  {navigationData?.map((navItem) => (
                    <li
                      key={navItem.id}
                      className={headerStyles.navitem}
                      onMouseEnter={() => handleMouseEnter(navItem.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link href={navItem.url} className={headerStyles.navlink}>
                        {navItem.label}
                      </Link>

                      {navItem.hasMegamenu &&
                        navItem.Megamenu?.length > 0 &&
                        openId === navItem.id && (
                          <div
                            className={headerStyles.megamenu}
                            onMouseEnter={() => handleMouseEnter(navItem.id)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className={headerStyles.megamenuInner}>
                              {navItem.Megamenu.map((menuItem) => (
                                <div
                                  key={menuItem.id}
                                  className={headerStyles.megacolContainer}
                                >
                                  <h4 className={headerStyles.columnTitle}>
                                    {menuItem.columnTitle}
                                  </h4>
                                  <div className={headerStyles.megacol}>
                                    {menuItem.links?.length > 0 && (
                                      <ul className={headerStyles.linklist}>
                                        {menuItem.links.map((link) => (
                                          <li key={link.id}>
                                            <Link href={link.url}>
                                              {link.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}

                                    {menuItem.featuredItems?.length > 0 && (
                                      <div
                                        className={
                                          menuItem.featuredItems?.length <= 2
                                            ? headerStyles.featuredgrid1
                                            : headerStyles.featuredgrid
                                        }
                                      >
                                        {menuItem.featuredItems.map((item) => (
                                          <Link
                                            key={item.id}
                                            href={item.url || "/"}
                                            className={
                                              headerStyles.featuredcard
                                            }
                                          >
                                            <Image
                                              src={getStrapiMedia(
                                                item.image.url,
                                              )}
                                              width={item.image.width}
                                              height={item.image.height}
                                              alt={item.image.name}
                                            />
                                            {item.title && (
                                              <span>{item.title}</span>
                                            )}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </li>
                  ))}
                </ul>
              </nav>
            </header>
            <header className={headerStyles.headerContainer}>
              <nav className={`${headerStyles.nav} ms-auto me-auto`}>
                <ul className={headerStyles.navlist}>
                  {headerData?.headerIcons.map((headerIcon) => (
                    <li key={headerIcon.id}>
                      <Link href={headerIcon.url}>
                        {headerIcon?.icon && (
                          <Image
                            src={getStrapiMedia(headerIcon.icon.url)}
                            width={headerIcon.icon.width}
                            height={headerIcon.icon.height}
                            alt={headerIcon.icon.name}
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </header>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

export default Header;
