"use client";

import React, { useState, useEffect, useRef } from "react";
import headerStyles from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
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
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(!show);

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

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
    setShow(!show);
  };

  return (
    <div>
      <section className="d-lg-block d-none fixed-top">
        <div className={headerStyles.topbarContainer}>
          <span>{headerData?.topbarText}</span>
        </div>
        <Navbar expand="lg" className="bg-white">
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
      <section className="d-lg-none d-block fixed-top">
        <div className={headerStyles.topbarContainer}>
          <span>{mobileMenuData?.header?.topbarText}</span>
        </div>
        <Container>
          <Navbar expand="lg" className="bg-white">
            <Container>
              <div className="d-flex align-items-center justify-content-between w-100 pt-2">
                <div className="d-flex">
                  {mobileMenuData?.header?.headerIcons.map(
                    (headerIcon, index) => (
                      <div key={headerIcon.id}>
                        <Link
                          href={headerIcon?.url || ""}
                          onClick={
                            index === 0
                              ? toggleMobileMenu
                              : index === 0
                                ? handleShow
                                : ""
                          }
                        >
                          {headerIcon?.icon &&
                            index <= 1 &&
                            (!openMobileMenu && index === 0 ? (
                              <span className={headerStyles.mobileHeaderIcon}>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12ZM3.75 7.125H20.25C20.5484 7.125 20.8345 7.00647 21.0455 6.7955C21.2565 6.58452 21.375 6.29837 21.375 6C21.375 5.70163 21.2565 5.41548 21.0455 5.2045C20.8345 4.99353 20.5484 4.875 20.25 4.875H3.75C3.45163 4.875 3.16548 4.99353 2.9545 5.2045C2.74353 5.41548 2.625 5.70163 2.625 6C2.625 6.29837 2.74353 6.58452 2.9545 6.7955C3.16548 7.00647 3.45163 7.125 3.75 7.125ZM20.25 16.875H3.75C3.45163 16.875 3.16548 16.9935 2.9545 17.2045C2.74353 17.4155 2.625 17.7016 2.625 18C2.625 18.2984 2.74353 18.5845 2.9545 18.7955C3.16548 19.0065 3.45163 19.125 3.75 19.125H20.25C20.5484 19.125 20.8345 19.0065 21.0455 18.7955C21.2565 18.5845 21.375 18.2984 21.375 18C21.375 17.7016 21.2565 17.4155 21.0455 17.2045C20.8345 16.9935 20.5484 16.875 20.25 16.875Z"
                                    fill="black"
                                  ></path>
                                </svg>
                              </span>
                            ) : (
                              <Image
                                src={getStrapiMedia(headerIcon?.icon?.url)}
                                width={headerIcon?.icon?.width}
                                height={headerIcon?.icon?.height}
                                alt={headerIcon?.icon?.name}
                                className={headerStyles.mobileHeaderIcon}
                              />
                            ))}
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
          <Offcanvas
            show={show}
            onHide={handleClose}
            className={`${headerStyles.offcanvasContainer} w-100`}
            backdrop={false}
          >
            {openMobileMenu && (
              <div className={headerStyles.mobileMenuContainer}>
                <ul className="list-unstyled">
                  {mobileMenuData?.menuItems?.map((menuItem) => {
                    if (menuItem.__component === "menu.menu-item-section") {
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
                              <span
                                className={isOpen ? headerStyles.rotated : ""}
                              >
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
                    }
                    return null; // skip menu-link items here
                  })}
                </ul>

                {/* Auth buttons outside the <ul> */}
                <div className={headerStyles.mobileMenuBtnContainer}>
                  {mobileMenuData?.menuItems
                    ?.filter((item) => item.__component === "menu.menu-link")
                    .map((menuLink) => (
                      <Link
                        key={menuLink.id}
                        href={menuLink.url}
                        className={headerStyles.mobileMenuBtn}
                      >
                        {menuLink.icon && (
                          <Image
                            src={getStrapiMedia(menuLink.icon.url)}
                            width={menuLink.icon.width}
                            height={menuLink.icon.height}
                            alt={menuLink.icon.name}
                          />
                        )}
                        {menuLink.title}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </Offcanvas>
        </Container>
      </section>
    </div>
  );
};

export default Header;
