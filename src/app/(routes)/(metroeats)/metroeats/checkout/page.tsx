"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  useGetCurrentUserQuery,
  useCreateMealOrderMutation,
  useActiveServiceAreasQuery,
  MealStyle,
  UserRole,
  Channel,
} from "@/graphql/api";
import { Routes } from "@/constants/routes";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { useMetroEatsCart } from "../_context/MetroEatsCartContext";
import { useMetroEatsPayment } from "@/hooks/useMetroEatsPayment";
import PaymentSuccessModal from "./_components/PaymentSuccessModal/PaymentSuccessModal";
import styles from "./checkout.module.scss";

const fmt = (n: number) => `₦${n.toLocaleString()}`;

const DELIVERY_FEE = 1500;
const MIN_PASSWORD_LENGTH = 5;

// --- Icons ---
const LockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useMetroEatsCart();
  const {
    data: userData,
    loading: userLoading,
    refetch: refetchUser,
  } = useGetCurrentUserQuery();
  const [createMealOrder, { loading: orderLoading, error: submitError }] =
    useCreateMealOrderMutation();
  const { handleRegisterAndSignIn, handleLogin, registerLoading } =
    useAuthOperations();
  const { data: serviceAreasData } = useActiveServiceAreasQuery();

  const [address, setAddress] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  // Guest / registration fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [createdOrderTotal, setCreatedOrderTotal] = useState<number | null>(
    null,
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  const me = userData?.me;
  const addresses = me?.addresses?.filter(Boolean) ?? [];
  const orderTotal = cartTotal + DELIVERY_FEE;
  const isGuest = !me;
  const {
    initializeMealPayment,
    loading: paymentInitializing,
    verifyPaymentLoading,
    error: paymentError,
    paymentSuccess,
  } = useMetroEatsPayment();

  const submitting =
    orderLoading ||
    registerLoading ||
    paymentInitializing ||
    verifyPaymentLoading;

  const serviceAreas = [
    { name: "Yaba", deliveryCost: 3500 },
    { name: "Ikoyi", deliveryCost: 3000 },
    { name: "Victoria Island", deliveryCost: 3000 },
    { name: "Lekki Phase 1", deliveryCost: 3000 },
    { name: "Ikate", deliveryCost: 2500 },
    { name: "Osapa", deliveryCost: 2000 },
    { name: "Agungi", deliveryCost: 2000 },
    { name: "Chevron", deliveryCost: 1500 },
    { name: "Orchid Rd", deliveryCost: 1500 },
    { name: "Ikota", deliveryCost: 1500 },
    { name: "VGC", deliveryCost: 1500 },
    { name: "Ajah", deliveryCost: 1500 },
    { name: "Badore", deliveryCost: 2500 },
    { name: "Abraham Adesanya", deliveryCost: 2000 },
    { name: "Ogombo", deliveryCost: 2500 },
    { name: "Sangotedo", deliveryCost: 3000 },
  ];
  const hasServiceAreas = serviceAreas.length > 0;

  useEffect(() => {
    if (addresses.length > 0 && !address) {
      setAddress(addresses[0] ?? "");
    }
  }, [addresses, address]);

  useEffect(() => {
    if (hasServiceAreas && !serviceArea) {
      setServiceArea(serviceAreas[0].name);
    }
  }, [hasServiceAreas, serviceAreas, serviceArea]);

  // Default to adding a new address if the logged-in user has no addresses
  useEffect(() => {
    if (!isGuest && addresses.length === 0) {
      setIsAddingNewAddress(true);
    }
  }, [isGuest, addresses.length]);

  const placeOrderWithAddress = async (targetAddress: string) => {
    if (items.length === 0) return;

    // In a real app, specialInstructions would be added to the input payload here
    const result = await createMealOrder({
      variables: {
        input: {
          address: targetAddress,
          items: items.map((line) => {
            const item: {
              mealId: string;
              quantity: number;
              style: MealStyle;
              extras?: { extraId: string; quantity: number }[];
            } = {
              mealId: line.mealId,
              quantity: line.quantity,
              style: line.style as MealStyle,
            };
            if (line.extras?.length) {
              item.extras = line.extras.map((e) => ({
                extraId: e.id,
                quantity: e.quantity,
              }));
            }
            return item;
          }),
        },
      },
    });
    const order = result.data?.createMealOrder;
    if (!order) {
      throw new Error("Failed to create order. Please try again.");
    }

    setCreatedOrderId(order.id);
    setCreatedOrderTotal(order.totalPrice);

    const customerEmail = me?.email || email.trim().toLowerCase();
    await initializeMealPayment(order.id, order.totalPrice, customerEmail);

    if (items.length > 0) {
      clearCart();
    }
    setShowConfirmation(true);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);

    try {
      if (isGuest && isLoginMode) {
        if (!email.trim() || !password) return;
        if (handleLogin) {
          await handleLogin(email.trim().toLowerCase(), password, {
            redirectToDashboard: false,
          });
          await refetchUser();
          return;
        } else {
          throw new Error(
            "Login is currently unavailable. Please sign up or contact support.",
          );
        }
      }

      if (items.length === 0) return;

      // Logged in user checkout
      if (me) {
        let finalAddress = address;

        if (isAddingNewAddress) {
          if (!street.trim() || !serviceArea) return;
          finalAddress = street.trim() + ", " + serviceArea;
        } else {
          if (!finalAddress) return;
        }

        await placeOrderWithAddress(finalAddress);
        return;
      }

      // Guest user registration & checkout
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !email.trim() ||
        !password ||
        password.length < MIN_PASSWORD_LENGTH
      ) {
        return;
      }
      if (!street.trim() || !serviceArea) {
        return;
      }

      await handleRegisterAndSignIn({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone: phone.trim() || undefined,
        role: UserRole.Customer,
        address: street.trim() + ", " + serviceArea,
        channel: Channel.MetroeatsWebsite,
      });

      const refetchedResult = await refetchUser();
      const newAddresses =
        refetchedResult.data?.me?.addresses?.filter(Boolean) ?? [];
      const newAddress = newAddresses[0];
      if (!newAddress) {
        throw new Error("Address was not created. Please try again.");
      }

      await placeOrderWithAddress(newAddress);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setRegisterError(err.message);
      }
    }
  };

  const displayError =
    registerError ?? submitError?.message ?? paymentError ?? null;

  if (userLoading) {
    return (
      <div className={styles.checkoutWrapper}>
        <div className={styles.checkout__empty}>
          <div className={styles.checkout__loadingSpinner}></div>
          <p>Loading your details…</p>
        </div>
      </div>
    );
  }

  const canSubmitLoggedIn = isAddingNewAddress
    ? !!street.trim() && !!serviceArea
    : !!address && addresses.length > 0;

  const canSubmitGuest = isLoginMode
    ? !!email.trim() && password.length > 0
    : !!firstName.trim() &&
      !!lastName.trim() &&
      !!email.trim() &&
      password.length >= MIN_PASSWORD_LENGTH &&
      !!street.trim() &&
      !!serviceArea;

  const canSubmit = isGuest ? canSubmitGuest : canSubmitLoggedIn;

  if (showConfirmation && paymentSuccess && createdOrderId) {
    return (
      <div className={styles.checkoutWrapper}>
        <PaymentSuccessModal
          isOpen={true}
          onClose={() => router.push("/metroeats/menu")}
          totalPaid={createdOrderTotal}
        />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className={styles.checkoutWrapper}>
        <div className={styles.checkout__empty}>
          <div className={styles.checkout__emptyIcon}>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some delicious meals from the menu to get started.</p>
          <Link href="/metroeats/menu" className={styles.checkout__primaryBtn}>
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      {/* Hero Section matching the design */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <Link href="/metroeats/menu" className={styles.heroBackLink}>
            <ArrowLeftIcon /> Back to Menu
          </Link>
          <h1 className={styles.heroTitle}>Checkout</h1>
          <p className={styles.heroSubtitle}>
            Homestyle Nigerian meals cooked fresh every day.
          </p>
        </div>
      </div>

      <div className={styles.checkoutWrapper}>
        <form onSubmit={handlePlaceOrder}>
          <div className={styles.checkoutContainer}>
            {/* Left Column: Form Details */}
            <div className={styles.leftColumn}>
              {/* STEP 1: Delivery Details */}
              <div className={styles.stepSection}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepBadge}>1</div>
                  <h2 className={styles.stepTitle}>
                    {isGuest && isLoginMode
                      ? "Account Login"
                      : "Delivery Details"}
                  </h2>
                </div>

                <div className={styles.stepContent}>
                  {isGuest && (
                    <div className={styles.authToggleRow}>
                      <span className={styles.authToggleText}>
                        {isLoginMode ? "New here?" : "Already have an account?"}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsLoginMode(!isLoginMode);
                          setRegisterError(null);
                        }}
                        className={styles.authToggleBtn}
                      >
                        {isLoginMode
                          ? "Sign up for delivery"
                          : "Log in to checkout faster"}
                      </button>
                    </div>
                  )}

                  {isGuest ? (
                    <div className={styles.formGrid}>
                      {!isLoginMode && (
                        <>
                          <div className={styles.inputGroup}>
                            <label htmlFor="firstName">First name</label>
                            <input
                              id="firstName"
                              type="text"
                              placeholder="First Name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                            />
                          </div>
                          <div className={styles.inputGroup}>
                            <label htmlFor="lastName">Last name</label>
                            <input
                              id="lastName"
                              type="text"
                              placeholder="Last Name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                            />
                          </div>
                        </>
                      )}

                      <div
                        className={`${styles.inputGroup} ${isLoginMode ? styles.fullWidth : ""}`}
                      >
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div
                        className={`${styles.inputGroup} ${isLoginMode ? styles.fullWidth : ""}`}
                      >
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          type="password"
                          placeholder={
                            isLoginMode
                              ? "Enter your password"
                              : "At least 6 characters"
                          }
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={isLoginMode ? 1 : MIN_PASSWORD_LENGTH}
                        />
                      </div>

                      {!isLoginMode && (
                        <>
                          <div className={styles.inputGroup}>
                            <label htmlFor="phone">Phone Number</label>
                            <input
                              id="phone"
                              type="tel"
                              placeholder="Phone Number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>

                          <div className={styles.inputGroup}>
                            <label htmlFor="street">Delivery Address</label>
                            <input
                              id="street"
                              type="text"
                              placeholder="Street Address"
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                              required
                            />
                          </div>

                          {hasServiceAreas && (
                            <div className={styles.inputGroup}>
                              <label htmlFor="serviceArea">Service Area</label>
                              <div className={styles.selectWrapper}>
                                <select
                                  id="serviceArea"
                                  value={serviceArea}
                                  onChange={(e) =>
                                    setServiceArea(e.target.value)
                                  }
                                  required
                                >
                                  <option value="">Select service area</option>
                                  {serviceAreas.map((area) => (
                                    <option
                                      key={
                                        area.name ||
                                        "serviceArea-" + Math.random()
                                      }
                                      value={area.name}
                                    >
                                      {area.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className={styles.formGrid}>
                      {/* Authenticated User: Address Options */}
                      {addresses.length > 0 && (
                        <div
                          className={`${styles.inputGroup} ${styles.fullWidth}`}
                        >
                          <div className={styles.addressToggleRow}>
                            <button
                              type="button"
                              className={styles.addressToggleBtn}
                              onClick={() =>
                                setIsAddingNewAddress(!isAddingNewAddress)
                              }
                            >
                              {isAddingNewAddress
                                ? "Use an existing saved address"
                                : "+ Add a new address for this order"}
                            </button>
                          </div>
                        </div>
                      )}

                      {isAddingNewAddress ? (
                        <>
                          <div className={styles.inputGroup}>
                            <label htmlFor="street">New Street Address</label>
                            <input
                              id="street"
                              type="text"
                              placeholder="Street Address"
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                              required
                            />
                          </div>

                          {hasServiceAreas && (
                            <div className={styles.inputGroup}>
                              <label htmlFor="serviceArea">Service Area</label>
                              <div className={styles.selectWrapper}>
                                <select
                                  id="serviceArea"
                                  value={serviceArea}
                                  onChange={(e) =>
                                    setServiceArea(e.target.value)
                                  }
                                  required
                                >
                                  <option value="">Select service area</option>
                                  {serviceAreas.map((area) => (
                                    <option
                                      key={
                                        area.name ||
                                        "serviceArea-" + Math.random()
                                      }
                                      value={area.name}
                                    >
                                      {area.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div
                          className={`${styles.inputGroup} ${styles.fullWidth}`}
                        >
                          <label htmlFor="address">
                            Select Delivery Address
                          </label>
                          <div className={styles.selectWrapper}>
                            <select
                              id="address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              required
                            >
                              <option value="">Select address</option>
                              {addresses.map((addr) =>
                                addr ? (
                                  <option key={addr} value={addr}>
                                    {addr}
                                  </option>
                                ) : null,
                              )}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Special Instructions Field (Visible to logged in or guest sign-ups) */}
                  {(!isGuest || !isLoginMode) && (
                    <div
                      className={`${styles.inputGroup} ${styles.fullWidth} ${styles.specialInstructions}`}
                    >
                      <label htmlFor="instructions">Special Instructions</label>
                      <textarea
                        id="instructions"
                        placeholder="Please, special instructions..."
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 2: Payment Method */}
              <div className={styles.stepSection}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepBadge}>2</div>
                  <h2 className={styles.stepTitle}>Payment Method</h2>
                </div>

                <div className={styles.stepContent}>
                  <div className={styles.paymentMethodsWrapper}>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="payment" defaultChecked />
                      <span className={styles.radioText}>
                        Credit/Debit Card
                      </span>
                    </label>

                    {/* Visual Mock of Payment box mapping to design */}
                    <div className={styles.paymentCardBox}>
                      <div className={styles.paymentCardHeader}>
                        <span>Credit/Debit Card</span>
                        <span className={styles.paystackLogo}>Secure Pay</span>
                      </div>
                      <div className={styles.paymentCardBody}>
                        <p className={styles.paymentDisclaimer}>
                          <LockIcon /> You will be securely redirected to our
                          payment partner to complete your transaction after
                          placing the order.
                        </p>
                      </div>
                    </div>

                    <label className={styles.radioLabelDisabled}>
                      <input type="radio" name="payment" disabled />
                      <span className={styles.radioText}>
                        Cash on Delivery (Unavailable)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <aside className={styles.rightColumn}>
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>Order summary</h3>

                <div className={styles.summaryItemList}>
                  {items.map((item, idx) => {
                    const lineTotal =
                      item.price * item.quantity +
                      (item.extras?.reduce(
                        (s, e) => s + e.price * e.quantity,
                        0,
                      ) ?? 0);
                    // Use actual item image if available in your item model, else a branded placeholder
                    const imageUrl =
                      (item as any).image ||
                      `https://placehold.co/100x100/f3f4f6/1a1a1a?text=${item.name.substring(0, 1)}`;

                    return (
                      <div
                        key={item.lineId || idx}
                        className={styles.summaryItemRow}
                      >
                        <div className={styles.summaryItemImage}>
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            width={50}
                            height={50}
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className={styles.summaryItemDetails}>
                          <span className={styles.summaryItemName}>
                            {item.name} ({item.quantity})
                          </span>
                          {item.customization?.protein && (
                            <span className={styles.summaryItemSub}>
                              {item.customization.protein}
                            </span>
                          )}
                        </div>
                        <div className={styles.summaryItemPrice}>
                          {fmt(lineTotal)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.summaryTotalsArea}>
                  <div className={styles.totalsRow}>
                    <span>Subtotal:</span>
                    <span>{fmt(cartTotal)}</span>
                  </div>
                  <div className={styles.totalsRow}>
                    <span>Delivery Fee:</span>
                    <span>{fmt(DELIVERY_FEE)}</span>
                  </div>
                  <div className={styles.totalsRowTotal}>
                    <span>Total:</span>
                    <span>{fmt(orderTotal)}</span>
                  </div>
                </div>

                {displayError && (
                  <div className={styles.errorAlert}>{displayError}</div>
                )}

                <button
                  type="submit"
                  className={styles.placeOrderBtn}
                  disabled={submitting || !canSubmit}
                >
                  {submitting
                    ? isGuest
                      ? isLoginMode
                        ? "Logging in..."
                        : "Creating account…"
                      : "Processing..."
                    : isGuest && isLoginMode
                      ? "Log in to continue"
                      : `Place Order`}
                </button>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
}
