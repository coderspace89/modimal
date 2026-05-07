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
import { BsMailboxFlag } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import qs from "qs";
import { usePathname } from "next/navigation";
import paymentFormStyles from "./PaymentForm.module.css";

const PaymentForm = () => {
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

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

  // Redirect if no checkout data
  useEffect(() => {
    if (!checkoutData?.shippingAddress || !checkoutData?.shippingMethod) {
      router.push("/checkout/info");
    }
  }, [checkoutData, router]);

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

  // Redirect if no checkout data
  useEffect(() => {
    if (!checkoutData?.shippingAddress || !checkoutData?.shippingMethod) {
      router.push("/checkout/info");
    }
  }, [checkoutData, router]);

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

    // 1. Validate the PaymentElement
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message);
      setIsProcessing(false);
      return;
    }

    // 2. Create PaymentIntent on backend
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(total * 100), // Stripe uses cents
        currency: "usd",
        // metadata: {
        //   email: checkoutData.email,
        //   shippingAddress: JSON.stringify(checkoutData.shippingAddress),
        //   shippingMethod: JSON.stringify(checkoutData.shippingMethod),
        //   items: JSON.stringify(
        //     items.map((i) => ({
        //       productId: i.productId,
        //       name: i.product.name,
        //       price: i.price,
        //       quantity: i.quantity,
        //       size: i.size.name,
        //       color: i.color.colorName,
        //       image: i.product.mainImage.url,
        //     })),
        //   ),
        //   subtotal: Math.round(subtotal * 100),
        //   tax: Math.round(tax * 100),
        //   shipping: Math.round(shipping * 100),
        // },
        metadata: {
          email: checkoutData.email,
          order_total: total.toString(),
          // Remove these - too large:
          // shippingAddress: JSON.stringify(checkoutData.shippingAddress),
          // items: JSON.stringify(items)
        },
      }),
    });

    if (!res.ok) {
      setError("Failed to initialize payment. Please try again.");
      setIsProcessing(false);
      return;
    }

    const { clientSecret } = await res.json();

    // 3. Confirm payment - handles card, PayPal, Apple Pay automatically
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        payment_method_data: {
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
      },
      redirect: "if_required", // Cards stay on page, PayPal redirects
    });

    if (stripeError) {
      setError(stripeError.message);
      setIsProcessing(false);
      router.push(
        `/checkout/failed?message=${encodeURIComponent(stripeError.message)}`,
      );
      return;
    }

    // 4. Payment succeeded - create order in Strapi
    if (paymentIntent.status === "succeeded") {
      const orderRes = await fetch(`/api/orders`, {
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
      });

      if (!orderRes.ok) {
        const errData = await orderRes.json();
        console.error("Strapi error:", errData); // <-- Add this
        setError(
          `Payment succeeded but failed to save order: ${errData.error?.message || "Contact support"}`,
        );
        setIsProcessing(false);
        return;
      }

      const order = await orderRes.json();
      clearCart();
      sessionStorage.removeItem("checkout");
      router.push(`/checkout/success?orderId=${order.data.id}`);
    }
  };

  // useEffect(() => {
  //   if (total === 0) {
  //     router.push("/shopping-cart");
  //   }
  // }, [total, router]);

  // render terms disclaimer
  const renderTermsText = (text, termUrl, privacyUrl) => {
    if (!text) return null;

    const parts = text.split(/(Term Of Sale|Privacy Policy)/g);

    return parts.map((part, i) => {
      if (part === "Term Of Sale") {
        return (
          <Link
            key={i}
            href={termUrl || "/terms-and-condition"}
            className={paymentFormStyles.termsLink}
          >
            Term Of Sale
          </Link>
        );
      }
      if (part === "Privacy Policy") {
        return (
          <Link
            key={i}
            href={privacyUrl || "/privacy-policy"}
            className={paymentFormStyles.termsLink}
          >
            Privacy Policy
          </Link>
        );
      }
      return part;
    });
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
              <h6 className={paymentFormStyles.billingAddressTitle}>
                {paymentFormData?.payment?.billingAddressTitle}
              </h6>
              <div className="mb-4">
                <div className={`${paymentFormStyles.formCheck} mb-3`}>
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
                <div className={`${paymentFormStyles.formCheck} mb-3`}>
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
                      <MdPerson
                        size={16}
                        color="#606060"
                        className="position-absolute top-50 translate-middle-y mx-3"
                      />
                      <input
                        type="text"
                        placeholder="Name"
                        className={paymentFormStyles.formInput}
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
                      <MdEmail
                        size={16}
                        color="#606060"
                        className="position-absolute top-50 translate-middle-y mx-3"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className={paymentFormStyles.formInput}
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
                      <MdFlag
                        size={16}
                        color="#606060"
                        className="position-absolute top-50 translate-middle-y mx-3"
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        className={paymentFormStyles.formInput}
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
                      <MdHome
                        size={16}
                        color="#606060"
                        className="position-absolute top-50 translate-middle-y mx-3"
                      />
                      <input
                        type="text"
                        placeholder="Address Line1"
                        className={paymentFormStyles.formInput}
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
                      <MdHome
                        size={16}
                        color="#606060"
                        className="position-absolute top-50 translate-middle-y mx-3"
                      />
                      <input
                        type="text"
                        placeholder="Address Line2"
                        className={paymentFormStyles.formInput}
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
                      <MdLocationCity
                        size={16}
                        color="#606060"
                        className="position-absolute top-50 translate-middle-y mx-3"
                      />
                      <input
                        type="text"
                        placeholder="City / Suburb"
                        className={paymentFormStyles.formInput}
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
                      <BsMailboxFlag
                        size={16}
                        color="#606060"
                        className="position-absolute top-50 translate-middle-y mx-3"
                      />
                      <input
                        type="text"
                        placeholder="Zip / Postcode"
                        className={paymentFormStyles.formInput}
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
                      <MdPhone
                        size={16}
                        color="#606060"
                        className="position-absolute top-50 translate-middle-y mx-3"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        className={paymentFormStyles.formInput}
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
                <h6 className={paymentFormStyles.paymentFormTitle}>
                  {paymentFormData?.payment?.paymentTitle}
                </h6>
                <p className="mb-3">
                  {paymentFormData?.payment?.paymentMethodLabel}
                </p>
              </div>
              <div className="mb-3">
                <div>
                  <PaymentElement
                    options={{
                      layout: "tabs", // shows Visa/MC/AMEX/PayPal as selectable tabs
                    }}
                  />
                </div>
              </div>

              {error && <p className="text-danger mb-3">{error}</p>}

              <button
                type="submit"
                disabled={!stripe || isProcessing}
                className={paymentFormStyles.paymentBtn}
              >
                {isProcessing
                  ? "Processing..."
                  : paymentFormData?.payment?.payButtonText}
              </button>

              <p className={paymentFormStyles.termsText}>
                {renderTermsText(
                  paymentFormData?.payment?.termsDisclaimer,
                  paymentFormData?.payment?.termOfSaleUrl,
                  paymentFormData?.payment?.privacyPolicyUrl,
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
