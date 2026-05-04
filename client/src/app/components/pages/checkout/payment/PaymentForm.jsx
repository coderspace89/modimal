"use client";
import { useState, useEffect } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  MdPerson,
  MdEmail,
  MdFlag,
  MdHome,
  MdLocationCity,
  MdPhone,
} from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import qs from "qs";
import { usePathname } from "next/navigation";
import paymentFormStyles from "./PaymentForm.module.css";

const PaymentForm = ({ labels }) => {
  const { checkoutData, setCheckoutData } = useCheckout();
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [billingAddress, setBillingAddress] = useState({
    useShipping: true,
    name: "",
    email: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [showCvcHelp, setShowCvcHelp] = useState(false);

  const pathname = usePathname();

  console.log(pathname);

  // 1. Determine the current active index based on route
  const activeIdx =
    pathname === "/checkout/info"
      ? 1
      : pathname === "/checkout/shipping"
        ? 2
        : pathname === "/checkout/payment"
          ? 3
          : "";

  // strapi page data
  const [paymentFormData, setPaymentFormData] = useState(null);

  // Fetch Page Labels
  useEffect(() => {
    const fetchPaymentFormData = async () => {
      const query = qs.stringify(
        { populate: { payment: true } },
        { encodeValuesOnly: true },
      );
      try {
        const res = await fetch(`/api/checkout-page?${query}`);
        const data = await res.json();
        console.log(data?.data);
        setPaymentFormData(data?.data || null);
      } catch (error) {
        console.error("Failed to fetch form data", error);
      }
    };
    fetchPaymentFormData();
  }, []);

  // Pre-fill billing from shipping if "Same As" is checked
  useEffect(() => {
    if (billingAddress.useShipping && checkoutData?.shippingAddress) {
      const addr = checkoutData.shippingAddress;
      setBillingAddress((prev) => ({
        ...prev,
        name: `${addr.firstName} ${addr.lastName}`,
        email: checkoutData.email,
        country: addr.country,
        address1: addr.address,
        address2: addr.apartment,
        city: addr.city,
        postalCode: addr.postalCode,
        phone: addr.phone,
      }));
    }
  }, [billingAddress.useShipping, checkoutData]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError("");

    try {
      // 1. Create PaymentIntent on your backend
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(total * 100), // Stripe uses cents
          currency: "usd",
          metadata: {
            email: checkoutData.email,
            shipping: JSON.stringify(checkoutData.shippingMethod),
          },
        }),
      });
      const { clientSecret } = await res.json();

      // 2. Confirm card payment
      const cardElement = elements.getElement(CardElement);
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: billingAddress.name,
              email: billingAddress.email,
              address: {
                line1: billingAddress.address1,
                line2: billingAddress.address2,
                city: billingAddress.city,
                postal_code: billingAddress.postalCode,
                country: billingAddress.country,
              },
              phone: billingAddress.phone,
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setIsProcessing(false);
        return;
      }

      // 3. Payment succeeded - create order in Strapi
      if (paymentIntent.status === "succeeded") {
        const orderRes = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              data: {
                orderNumber: paymentIntent.id,
                email: checkoutData.email,
                shippingAddress: checkoutData.shippingAddress,
                billingAddress: billingAddress,
                items: items.map((i) => ({
                  productId: i.productId,
                  name: i.product.name,
                  price: i.price,
                  quantity: i.quantity,
                  size: i.size.name,
                  color: i.color.colorName,
                  image: i.product.mainImage.url,
                })),
                subtotal,
                tax,
                shipping,
                total,
                paymentStatus: "paid",
                paymentIntentId: paymentIntent.id,
                fulfillmentStatus: "unfulfilled",
                emailOptIn: checkoutData.emailOptIn,
                shippingMethod: checkoutData.shippingMethod,
              },
            }),
          },
        );

        const order = await orderRes.json();
        clearCart();
        sessionStorage.removeItem("checkout");
        router.push(`/checkout/success?orderId=${order.data.id}`);
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": { color: "#aab7c4" },
        padding: "10px 12px",
      },
      invalid: { color: "#9e2146" },
    },
  };

  return (
    <section className={paymentFormStyles.container}>
      <Container>
        <Row>
          <div>
            {/* Breadcrumbs */}
            <Breadcrumb className={paymentFormStyles.breadcrumbsContainer}>
              {paymentFormData?.breadcrumbSteps?.map((step, idx) => {
                const isActive = idx === activeIdx;

                return (
                  <Breadcrumb.Item
                    key={step.text}
                    href={isActive ? undefined : step.link} // Disable link if active
                    active={isActive}
                    className={
                      isActive
                        ? paymentFormStyles.breadcrumbsText
                        : paymentFormStyles.breadcrumbsLink
                    }
                  >
                    {step.text}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </div>
          <Col lg={5}>
            <div>
              {/* Billing Address */}
              <h3 className="mb-3">
                {paymentFormData?.payment?.billingAddressTitle}
              </h3>
              <div className="mb-4">
                <div className="form-check mb-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="sameAsShipping"
                    checked={billingAddress.useShipping}
                    onChange={() =>
                      setBillingAddress((prev) => ({
                        ...prev,
                        useShipping: true,
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="sameAsShipping">
                    {paymentFormData?.payment?.sameAsShippingText}
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="differentAddress"
                    checked={!billingAddress.useShipping}
                    onChange={() =>
                      setBillingAddress((prev) => ({
                        ...prev,
                        useShipping: false,
                      }))
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="differentAddress"
                  >
                    {paymentFormData?.payment?.alternativeAddressText}
                  </label>
                </div>

                {!billingAddress.useShipping && (
                  <div>
                    <div className="position-relative mb-3">
                      <MdPerson className="position-absolute top-50 translate-middle-y ms-2" />
                      <input
                        type="text"
                        placeholder="Name"
                        className="form-control ps-5"
                        value={billingAddress.name}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="position-relative mb-3">
                      <MdEmail className="position-absolute top-50 translate-middle-y ms-2" />
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control ps-5"
                        value={billingAddress.email}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="position-relative mb-3">
                      <MdFlag className="position-absolute top-50 translate-middle-y ms-2" />
                      <input
                        type="text"
                        placeholder="Country"
                        className="form-control ps-5"
                        value={billingAddress.country}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            country: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="position-relative mb-3">
                      <MdHome className="position-absolute top-50 translate-middle-y ms-2" />
                      <input
                        type="text"
                        placeholder="Address Line1"
                        className="form-control ps-5"
                        value={billingAddress.address1}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            address1: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="position-relative mb-3">
                      <MdHome className="position-absolute top-50 translate-middle-y ms-2" />
                      <input
                        type="text"
                        placeholder="Address Line2"
                        className="form-control ps-5"
                        value={billingAddress.address2}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            address2: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="position-relative mb-3">
                      <MdLocationCity className="position-absolute top-50 translate-middle-y ms-2" />
                      <input
                        type="text"
                        placeholder="City / Suburb"
                        className="form-control ps-5"
                        value={billingAddress.city}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            city: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="position-relative mb-3">
                      <MdLocationCity className="position-absolute top-50 translate-middle-y ms-2" />
                      <input
                        type="text"
                        placeholder="Zip / Postcode"
                        className="form-control ps-5"
                        value={billingAddress.postalCode}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            postalCode: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="position-relative mb-3">
                      <MdPhone className="position-absolute top-50 translate-middle-y ms-2" />
                      <input
                        type="tel"
                        placeholder="Phone"
                        className="form-control ps-5"
                        value={billingAddress.phone}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            phone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col lg={7}>
            <form onSubmit={handlePayment}>
              {/* Payment Method */}
              <div>
                <h3 className="mb-3">
                  {paymentFormData?.payment?.paymentTitle}
                </h3>
                <p className="mb-3">
                  {paymentFormData?.payment?.paymentMethodLabel}
                </p>
              </div>

              <div className="d-flex gap-3 mb-4">
                <img src="/amex.png" alt="Amex" style={{ height: 30 }} />
                <img src="/visa.png" alt="Visa" style={{ height: 30 }} />
                <img
                  src="/mastercard.png"
                  alt="Mastercard"
                  style={{ height: 30 }}
                />
                <img src="/paypal.png" alt="PayPal" style={{ height: 30 }} />
              </div>

              <div className="mb-3">
                <label className="form-label">{labels?.cardNumberLabel}</label>
                <div className="form-control p-2">
                  <PaymentElement
                    options={{
                      layout: "tabs", // shows Visa/MC/AMEX/PayPal as selectable tabs
                    }}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">
                    {labels?.expiryDateLabel}
                  </label>
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      placeholder={labels?.monthPlaceholder}
                      className="form-control"
                      maxLength={2}
                    />
                    <input
                      type="text"
                      placeholder={labels?.yearPlaceholder}
                      className="form-control"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label d-flex align-items-center gap-2">
                  {labels?.securityCodeLabel}
                  <BsInfoCircle
                    onClick={() => setShowCvcHelp(!showCvcHelp)}
                    style={{ cursor: "pointer" }}
                  />
                  {showCvcHelp && (
                    <small className="text-muted">
                      {labels?.securityCodeHelpText}
                    </small>
                  )}
                </label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={4}
                  style={{ width: 150 }}
                />
              </div>

              {error && <p className="text-danger mb-3">{error}</p>}

              <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="btn btn-dark w-100 py-3 mb-3"
              >
                {isProcessing ? "Processing..." : labels?.payButtonText}
              </button>

              <p className="small text-muted">
                {labels?.termsDisclaimer
                  ?.replace(
                    "Term Of Sale",
                    `<a href="${labels?.termOfSaleUrl}">Term Of Sale</a>`,
                  )
                  .replace(
                    "Privacy Policy",
                    `<a href="${labels?.privacyPolicyUrl}">Privacy Policy</a>`,
                  )}
              </p>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PaymentForm;
