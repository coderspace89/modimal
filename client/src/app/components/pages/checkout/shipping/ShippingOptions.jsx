"use client";
import { useState, useEffect } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import qs from "qs";
import shippingOptionStyles from "./ShippingOptions.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const ShippingOptions = () => {
  const [shippingOptionsData, setShippingOptionsData] = useState(null);
  const { checkoutData, setCheckoutData } = useCheckout();
  const { setShipping } = useCart();
  const router = useRouter();

  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState("");

  // Fetch Page Labels
  useEffect(() => {
    const fetchShippingOptionsData = async () => {
      const query = qs.stringify(
        { populate: { shipping: true } },
        { encodeValuesOnly: true },
      );
      try {
        const res = await fetch(`/api/checkout-page?${query}`);
        const data = await res.json();
        console.log(data?.data);
        setShippingOptionsData(data?.data || null);
      } catch (error) {
        console.error("Failed to fetch form data", error);
      }
    };
    fetchShippingOptionsData();
  }, []);

  // Fetch shipping methods based on country from Info step
  useEffect(() => {
    if (!checkoutData?.shippingAddress?.country) {
      router.push("/checkout/info");
      return;
    }
    const fetchMethods = async () => {
      const res = await fetch(
        `/api/shipping-methods?filters[isActive][$eq]=true&filters[regions][$containsi]=${checkoutData.shippingAddress.country}&sort=order:asc`,
      );
      const data = await res.json();
      const methodsData = data?.data || [];
      setMethods(methodsData);

      // Auto-select first free option
      const freeMethod = methodsData.find((m) => m.price === 0);
      if (freeMethod) {
        handleSelectMethod(freeMethod);
      }
    };
    fetchMethods();
  }, [checkoutData?.shippingAddress?.country]);

  // Replace your getExpectedDates with this
  const getExpectedDates = (minDays) => {
    const dates = [];
    const today = new Date();
    const addBusinessDays = (startDate, days) => {
      let date = new Date(startDate);
      let added = 0;
      while (added < days) {
        date.setDate(date.getDate() + 1);
        if (date.getDay() !== 0 && date.getDay() !== 6) added++;
      }
      return date;
    };

    // Generate 4 unique sequential business days
    for (let i = 0; i < 4; i++) {
      const date = addBusinessDays(today, minDays + i);
      const dateStr = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      dates.push({ id: `${dateStr}-${i}`, label: dateStr });
    }
    return dates;
  };

  // For guaranteed: calculate specific date
  const getGuaranteedDate = (days, time) => {
    const today = new Date();
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    return `${dateStr} ${time}`;
  };

  const handleSelectMethod = (method) => {
    const attr = method; // Strapi v4 nests in attributes
    setSelectedMethod(method);
    setSelectedDate(null);
    setShipping(attr.price);
    setCheckoutData((prev) => ({
      ...prev,
      shippingMethod: {
        id: method.id,
        name: attr.name,
        price: attr.price,
        provider: attr.provider,
      },
    }));
  };

  const handleContinue = () => {
    if (!selectedMethod) {
      setError("Please select a delivery option");
      return;
    }
    const attr = selectedMethod;
    if (!attr.isGuaranteed && !selectedDate) {
      setError("Please select an expected delivery date");
      return;
    }

    setCheckoutData((prev) => ({
      ...prev,
      shippingMethod: {
        ...prev.shippingMethod,
        expectedDate:
          selectedDate ||
          getGuaranteedDate(attr.estimatedDaysMin, attr.guaranteeTime),
      },
    }));
    router.push("/checkout/payment");
  };

  return (
    <section className={shippingOptionStyles.container}>
      <Container>
        <Row>
          <Col>
            {/* Breadcrumbs */}
            <Breadcrumb
              className={`${shippingOptionStyles.breadcrumbsContainer} d-lg-block d-md-block d-none`}
            >
              {shippingOptionsData?.breadcrumbSteps?.map((step, idx) => (
                <Breadcrumb.Item
                  key={step.text}
                  href={step.link}
                  active={idx === 2}
                  className={
                    idx === 2
                      ? shippingOptionStyles.breadcrumbsText
                      : shippingOptionStyles.breadcrumbsLink
                  }
                >
                  {step.text}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <div>
              <div className="border-bottom pb-3 mb-3">
                <div className="d-flex justify-content-between">
                  <h5 className={shippingOptionStyles.contactTitle}>
                    {shippingOptionsData?.shipping?.contactSectionTitle}
                  </h5>
                  <Link
                    href="/checkout/info"
                    className={shippingOptionStyles.changeLink}
                  >
                    Change
                  </Link>
                </div>
                <p className="text-muted mb-0">{checkoutData?.email}</p>
              </div>

              <div className="pb-3 mb-4">
                <div className="d-flex justify-content-between">
                  <h5 className={shippingOptionStyles.shipTitle}>
                    {shippingOptionsData?.shipping?.shippingSectionTitle}
                  </h5>
                  <Link
                    href="/checkout/info"
                    className={shippingOptionStyles.changeLink}
                  >
                    Change
                  </Link>
                </div>
                <p className="text-muted mb-0">
                  {checkoutData?.shippingAddress?.address},{" "}
                  {checkoutData?.shippingAddress?.apartment},{" "}
                  {checkoutData?.shippingAddress?.city},{" "}
                  {checkoutData?.shippingAddress?.country}
                </p>
              </div>

              <h3 className={shippingOptionStyles.deliveryTitle}>
                {shippingOptionsData?.shipping?.deliveryOptionsLabel}
              </h3>
              {error && <p className="text-danger">{error}</p>}

              {methods.map((method) => {
                const attr = method; // Fix: use attributes
                const isSelected = selectedMethod?.id === method.id;

                return (
                  <div key={method.id} className="mb-4">
                    {!attr.isGuaranteed && (
                      <>
                        <div
                          className={`d-flex justify-content-between align-items-start pb-2 mb-2 cursor-pointer ${isSelected ? "border-dark" : ""}`}
                          onClick={() => handleSelectMethod(method)}
                          style={{ cursor: "pointer" }}
                        >
                          <div>
                            <h6 className={shippingOptionStyles.providerName}>
                              {attr.name}
                            </h6>
                            <p
                              className={
                                shippingOptionStyles.providerDescription
                              }
                            >
                              {attr.description}
                            </p>
                          </div>
                          <strong>
                            {attr.price === 0
                              ? "Free"
                              : `$${attr.price.toFixed(2)}`}
                          </strong>
                        </div>

                        {isSelected && (
                          <div className="row">
                            <div className="col-lg-6">
                              <p
                                className={
                                  shippingOptionStyles.expectedDateLabel
                                }
                              >
                                {
                                  shippingOptionsData?.shipping
                                    ?.expectedDateLabel
                                }
                              </p>
                            </div>
                            <div className="col-lg-6">
                              <div className="row">
                                {getExpectedDates(attr.estimatedDaysMin).map(
                                  (dateObj) => (
                                    <div
                                      key={dateObj.id}
                                      className="col-6 mb-2"
                                    >
                                      <div className="form-check">
                                        <input
                                          type="radio"
                                          className="form-check-input"
                                          name="expectedDate"
                                          id={dateObj.id}
                                          checked={
                                            selectedDate === dateObj.label
                                          }
                                          onChange={() =>
                                            setSelectedDate(dateObj.label)
                                          }
                                        />
                                        <label
                                          className={
                                            shippingOptionStyles.expectedDateText
                                          }
                                          htmlFor={dateObj.id}
                                        >
                                          {dateObj.label}
                                        </label>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {attr.isGuaranteed && (
                      <div className="mt-4">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="text-muted mb-1">
                              {shippingOptionsData?.shipping?.guaranteedLabel}
                            </h6>
                            <p className="text-muted mb-0">{attr.provider}</p>
                          </div>
                        </div>
                        <div
                          className={`d-flex justify-content-between align-items-center py-2 cursor-pointer ${isSelected ? "bg-light" : ""}`}
                          onClick={() => {
                            handleSelectMethod(method);
                            setSelectedDate(
                              getGuaranteedDate(
                                attr.estimatedDaysMin,
                                attr.guaranteeTime,
                              ),
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="shippingMethod"
                              checked={isSelected}
                              readOnly
                            />
                            <label className="form-check-label">
                              {getGuaranteedDate(
                                attr.estimatedDaysMin,
                                attr.guaranteeTime,
                              )}
                            </label>
                          </div>
                          <strong>${attr.price.toFixed(2)}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="d-flex justify-content-between mt-5">
                <Link
                  href="/checkout/info"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <FiChevronLeft />{" "}
                  {shippingOptionsData?.shipping?.returnToInfoText}
                </Link>
                <button onClick={handleContinue} className="btn btn-dark px-5">
                  {shippingOptionsData?.shipping?.continueToPaymentText}
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ShippingOptions;
