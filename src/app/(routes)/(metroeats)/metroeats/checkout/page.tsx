"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const DELIVERY_FEE = 500;

const MIN_PASSWORD_LENGTH = 6;

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
  const { handleRegisterAndSignIn, registerLoading } = useAuthOperations();
  const { data: serviceAreasData } = useActiveServiceAreasQuery();

  const [addressId, setAddressId] = useState("");

  // Guest / registration fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [serviceAreaId, setServiceAreaId] = useState("");
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

  const serviceAreas = serviceAreasData?.activeServiceAreas ?? [];
  const hasServiceAreas = serviceAreas.length > 0;

  useEffect(() => {
    if (addresses.length > 0 && !addressId) {
      const defaultAddr = addresses.find((a) => a?.isDefault) ?? addresses[0];
      if (defaultAddr?.id) setAddressId(defaultAddr.id);
    }
  }, [addresses, addressId]);

  useEffect(() => {
    if (hasServiceAreas && !serviceAreaId) {
      setServiceAreaId(serviceAreas[0].id);
    }
  }, [hasServiceAreas, serviceAreas, serviceAreaId]);

  const placeOrderWithAddress = async (targetAddressId: string) => {
    if (items.length === 0) return;
    const result = await createMealOrder({
      variables: {
        input: {
          addressId: targetAddressId,
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
    if (items.length === 0) return;

    try {
      if (me) {
        if (!addressId) return;
        await placeOrderWithAddress(addressId);
        return;
      }

      // Guest: register then place order
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !email.trim() ||
        !password ||
        password.length < MIN_PASSWORD_LENGTH
      ) {
        return;
      }
      if (!street.trim() || !city.trim() || !serviceAreaId) {
        return;
      }

      await handleRegisterAndSignIn({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone: phone.trim() || undefined,
        role: UserRole.Customer,
        address: {
          street: street.trim(),
          city: city.trim(),
          serviceArea: serviceAreaId,
        },
        channel: Channel.MetroeatsWebsite,
      });

      const refetchedResult = await refetchUser();
      const newAddresses =
        refetchedResult.data?.me?.addresses?.filter(Boolean) ?? [];
      const newAddressId = newAddresses[0]?.id;
      if (!newAddressId) {
        throw new Error("Address was not created. Please try again.");
      }

      await placeOrderWithAddress(newAddressId);
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
      <div className={styles.checkout}>
        <div className={styles.checkout__empty}>
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className={styles.checkout}>
        <div className={styles.checkout__empty}>
          <h2>Your cart is empty</h2>
          <p>Add meals from the menu to checkout.</p>
          <Link href="/metroeats/menu" className={styles.checkout__backLink}>
            ← Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const canSubmitLoggedIn = !!addressId && addresses.length > 0;
  const canSubmitGuest =
    !!firstName.trim() &&
    !!lastName.trim() &&
    !!email.trim() &&
    password.length >= MIN_PASSWORD_LENGTH &&
    !!street.trim() &&
    !!city.trim() &&
    !!serviceAreaId;
  const canSubmit = isGuest ? canSubmitGuest : canSubmitLoggedIn;

  if (showConfirmation && paymentSuccess && createdOrderId) {
    return (
      <div className={styles.checkout}>
        <PaymentSuccessModal
          isOpen={true}
          onClose={() => router.push("/metroeats/menu")}
          totalPaid={createdOrderTotal}
        />
      </div>
    );
  }

  return (
    <div className={styles.checkout}>
      <div className={styles.checkout__header}>
        <Link href="/metroeats/menu" className={styles.checkout__backLink}>
          ← Back to Menu
        </Link>
        <h1 className={styles.checkout__pageTitle}>Checkout</h1>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className={styles.checkout__container}>
          <div className={styles.checkout__main}>
            {isGuest && (
              <>
                <div className={styles.checkout__section}>
                  <h2 className={styles.checkout__sectionTitle}>
                    Your details
                  </h2>
                  <p className={styles.checkout__sectionHint}>
                    Create an account so you can track your order. We&apos;ll
                    use this for delivery too.
                  </p>
                  <div className={styles.checkout__grid}>
                    <div className={styles.checkout__inputGroup}>
                      <label htmlFor="firstName">First name</label>
                      <input
                        id="firstName"
                        type="text"
                        placeholder="e.g. Chinedu"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.checkout__inputGroup}>
                      <label htmlFor="lastName">Last name</label>
                      <input
                        id="lastName"
                        type="text"
                        placeholder="e.g. Okafor"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                    <div
                      className={`${styles.checkout__inputGroup} ${styles["checkout__inputGroup--full"]}`}
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
                      className={`${styles.checkout__inputGroup} ${styles["checkout__inputGroup--full"]}`}
                    >
                      <label htmlFor="phone">Phone (optional)</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="0801 234 5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div
                      className={`${styles.checkout__inputGroup} ${styles["checkout__inputGroup--full"]}`}
                    >
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        type="password"
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={MIN_PASSWORD_LENGTH}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.checkout__section}>
                  <h2 className={styles.checkout__sectionTitle}>
                    Delivery address
                  </h2>
                  <div className={styles.checkout__grid}>
                    <div
                      className={`${styles.checkout__inputGroup} ${styles["checkout__inputGroup--full"]}`}
                    >
                      <label htmlFor="street">Street address</label>
                      <input
                        id="street"
                        type="text"
                        placeholder="e.g. 15 Admiralty Way, Lekki Phase 1"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.checkout__inputGroup}>
                      <label htmlFor="city">City</label>
                      <input
                        id="city"
                        type="text"
                        placeholder="e.g. Lagos"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    {hasServiceAreas && (
                      <div className={styles.checkout__inputGroup}>
                        <label htmlFor="serviceArea">Area</label>
                        <select
                          id="serviceArea"
                          value={serviceAreaId}
                          onChange={(e) => setServiceAreaId(e.target.value)}
                          required
                        >
                          <option value="">Select area</option>
                          {serviceAreas.map((area) => (
                            <option key={area.id} value={area.id}>
                              {area.name} {area.city ? `(${area.city})` : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {!isGuest && (
              <div className={styles.checkout__section}>
                <h2 className={styles.checkout__sectionTitle}>
                  Delivery address
                </h2>
                {addresses.length === 0 ? (
                  <p className={styles.checkout__summaryItemMeta}>
                    No addresses saved.{" "}
                    <Link href={Routes.DASHBOARD_ADDRESSES}>
                      Add an address
                    </Link>{" "}
                    in your dashboard first.
                  </p>
                ) : (
                  <div className={styles.checkout__inputGroup}>
                    <label htmlFor="address">Choose address</label>
                    <select
                      id="address"
                      value={addressId}
                      onChange={(e) => setAddressId(e.target.value)}
                      required
                    >
                      <option value="">Select address</option>
                      {addresses.map((addr) =>
                        addr ? (
                          <option key={addr.id} value={addr.id}>
                            {addr.label ||
                              [addr.street, addr.city, addr.state]
                                .filter(Boolean)
                                .join(", ")}
                          </option>
                        ) : null,
                      )}
                    </select>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className={styles.checkout__submitBtnMobile}
              disabled={submitting || !canSubmit}
            >
              {submitting
                ? isGuest
                  ? "Creating account…"
                  : "Placing order…"
                : `Place order — ${fmt(orderTotal)}`}
            </button>
          </div>

          <aside className={styles.checkout__sidebar}>
            <div className={styles.checkout__summaryCard}>
              <h2 className={styles.checkout__summaryTitle}>Order summary</h2>

              <div className={styles.checkout__summaryItems}>
                {items.map((item, idx) => {
                  const lineTotal =
                    item.price * item.quantity +
                    (item.extras?.reduce(
                      (s, e) => s + e.price * e.quantity,
                      0,
                    ) ?? 0);
                  return (
                    <div
                      key={item.lineId || idx}
                      className={styles.checkout__summaryItem}
                    >
                      <div className={styles.checkout__summaryItemInfo}>
                        <span className={styles.checkout__summaryItemQty}>
                          {item.quantity}×
                        </span>
                        <span className={styles.checkout__summaryItemName}>
                          {item.name}
                        </span>
                        {(item.customization?.protein ||
                          item.customization?.notes ||
                          (item.extras && item.extras.length > 0)) && (
                          <div className={styles.checkout__summaryItemMeta}>
                            {item.customization?.protein && (
                              <span>• {item.customization.protein}</span>
                            )}
                            {item.customization?.notes && (
                              <span>• {item.customization.notes}</span>
                            )}
                            {item.extras && item.extras.length > 0 && (
                              <span>
                                • +{item.extras.length} add-on
                                {item.extras.length !== 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <span className={styles.checkout__summaryItemPrice}>
                        {fmt(lineTotal)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className={styles.checkout__totals}>
                <div className={styles.checkout__totalsRow}>
                  <span>Subtotal</span>
                  <span>{fmt(cartTotal)}</span>
                </div>
                <div className={styles.checkout__totalsRow}>
                  <span>Delivery</span>
                  <span>{fmt(DELIVERY_FEE)}</span>
                </div>
                <div
                  className={`${styles.checkout__totalsRow} ${styles["checkout__totalsRow--bold"]}`}
                >
                  <span>Total</span>
                  <span>{fmt(orderTotal)}</span>
                </div>
              </div>

              {displayError && (
                <p className={styles.checkout__error}>{displayError}</p>
              )}

              <button
                type="submit"
                className={styles.checkout__submitBtn}
                disabled={submitting || !canSubmit}
              >
                {submitting
                  ? isGuest
                    ? "Creating account…"
                    : "Placing order…"
                  : "Place order"}
              </button>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
