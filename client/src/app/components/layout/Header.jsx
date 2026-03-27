"use client";

import React, { useState, useEffect, useRef } from "react";
import headerStyles from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import qs from "qs";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import Link from "next/link";

const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const [navigationData, setNavigationData] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [mobileMenuData, setMobileMenuData] = useState(null);
  const [openSections, setOpenSections] = useState({});

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

  const mobileMenuQuery = qs.stringify(
    {
      populate: {
        header: {
          populate: {
            logoImage: true,
            headerIcons: {
              populate: ["icon"],
            },
          },
        },
        menuItems: {
          on: {
            "menu.menu-item-section": {
              populate: {
                subItems: {
                  populate: {
                    MenuLinks: {
                      populate: ["icon"],
                    },
                  },
                },
              },
            },
            "menu.menu-link": {
              populate: ["icon"],
            },
            "menu.sub-items": {
              populate: {
                MenuLinks: {
                  populate: ["icon"],
                },
              },
            },
          },
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

  // fetching mobile menu

  useEffect(() => {
    const fetchMobileMenu = async () => {
      const response = await fetch(`/api/mobile-menu?${mobileMenuQuery}`);
      const data = await response.json();
      console.log(data?.data);
      setMobileMenuData(data?.data);
    };
    fetchMobileMenu();
  }, []);

  // toggle submenu sections
  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <section className="d-lg-block d-none">
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
                        <Link
                          href={navItem.url}
                          className={headerStyles.navlink}
                        >
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
                                          {menuItem.featuredItems.map(
                                            (item) => (
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
                                            ),
                                          )}
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
      <section className="d-lg-none d-block">
        <div className={headerStyles.topbarContainer}>
          <span>{mobileMenuData?.header?.topbarText}</span>
        </div>
        <Container>
          <Navbar expand="lg">
            <Container>
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className="d-flex">
                  {mobileMenuData?.header?.headerIcons.map(
                    (headerIcon, index) => (
                      <div key={headerIcon.id}>
                        <Link href={headerIcon?.url || ""}>
                          {headerIcon?.icon && index <= 1 && (
                            <Image
                              src={getStrapiMedia(headerIcon?.icon?.url)}
                              width={headerIcon?.icon?.width}
                              height={headerIcon?.icon?.height}
                              alt={headerIcon?.icon?.name}
                              className={headerStyles.mobileHeaderIcon}
                            />
                          )}
                        </Link>
                      </div>
                    ),
                  )}
                </div>
                <div>
                  <Navbar.Brand href="/">
                    {mobileMenuData?.header?.logoImage && (
                      <Image
                        src={getStrapiMedia(
                          mobileMenuData?.header?.logoImage?.url,
                        )}
                        width={mobileMenuData?.header?.logoImage?.width}
                        height={mobileMenuData?.header?.logoImage?.height}
                        alt={mobileMenuData?.header?.logoImage?.name}
                        className={headerStyles.logoImage}
                      />
                    )}
                  </Navbar.Brand>
                </div>
                <div className="d-flex">
                  {mobileMenuData?.header?.headerIcons.map(
                    (headerIcon, index) => (
                      <div key={headerIcon.id}>
                        <Link href={headerIcon?.url || ""}>
                          {headerIcon?.icon && index > 1 && (
                            <Image
                              src={getStrapiMedia(headerIcon?.icon?.url)}
                              width={headerIcon?.icon?.width}
                              height={headerIcon?.icon?.height}
                              alt={headerIcon?.icon?.name}
                              className={headerStyles.mobileHeaderIcon}
                            />
                          )}
                        </Link>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </Container>
          </Navbar>
          {/* <div className={headerStyles.mobileMenuContainer}>
            <ul className="list-unstyled">
              {mobileMenuData?.menuItems?.map((menuItem, index) => (
                <li
                  key={menuItem.id}
                  className={headerStyles.mobileMenuListItemContainer}
                >
                  {index < 5 && (
                    <div onClick={() => toggleSection(menuItem.id)}>
                      <span>{menuItem?.title}</span>
                      <span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.41 8.29492L12 12.8749L16.59 8.29492L18 9.70492L12 15.7049L6 9.70492L7.41 8.29492Z"
                            fill="#0C0C0C"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                  {menuItem.hasSubItems && menuItem.subItems?.length > 0 && (
                    <ul className="list-unstyled">
                      {menuItem.subItems.map((sub) =>
                        sub.MenuLinks?.map((menuLink) => (
                          <li
                            key={menuLink.id}
                            className={headerStyles.mobileSubMenuItem}
                          >
                            <Link href={menuLink.url}>
                              {menuLink.title || menuLink.url}
                            </Link>
                          </li>
                        )),
                      )}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div> */}
          <div className={headerStyles.mobileMenuContainer}>
            <ul className="list-unstyled">
              {mobileMenuData?.menuItems?.map((menuItem) => {
                // Only render section-type items here
                if (menuItem.__component !== "menu.menu-item-section") {
                  // Plain link (Log In / Create Account)
                  return (
                    <li
                      key={menuItem.id}
                      className={headerStyles.mobileMenuListItemContainer}
                    >
                      <Link href={menuItem.url}>{menuItem.title}</Link>
                    </li>
                  );
                }

                const isOpen = !!openSections[menuItem.id];

                return (
                  <li
                    key={menuItem.id}
                    className={headerStyles.mobileMenuListItemContainer}
                  >
                    <div
                      onClick={() => toggleSection(menuItem.id)}
                      className={headerStyles.sectionHeader}
                    >
                      <span>{menuItem.title}</span>
                      {menuItem.hasSubItems && (
                        <span className={isOpen ? headerStyles.rotated : ""}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M7.41 8.29492L12 12.8749L16.59 8.29492L18 9.70492L12 15.7049L6 9.70492L7.41 8.29492Z"
                              fill="#0C0C0C"
                            />
                          </svg>
                        </span>
                      )}
                    </div>

                    {/* Show sub-menu only when this section is open */}
                    {isOpen &&
                      menuItem.hasSubItems &&
                      menuItem.subItems?.length > 0 && (
                        <ul className="list-unstyled">
                          {menuItem.subItems.map((sub) =>
                            sub.MenuLinks?.map((menuLink) => (
                              <li
                                key={menuLink.id}
                                className={headerStyles.mobileSubMenuItem}
                              >
                                <Link href={menuLink.url}>
                                  {menuLink.title || menuLink.url}
                                </Link>
                              </li>
                            )),
                          )}
                        </ul>
                      )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Header;
