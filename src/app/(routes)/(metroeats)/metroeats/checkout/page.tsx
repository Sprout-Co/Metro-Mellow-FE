"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useGetCurrentUserQuery,
  useCreateMealOrderMutation,
  TimeSlot,
  MealStyle,
} from "@/graphql/api";
import { Routes } from "@/constants/routes";
import { useMetroEatsCart } from "../_context/MetroEatsCartContext";
import styles from "./checkout.module.scss";

const fmt = (n: number) => `₦${n.toLocaleString()}`;

const TIME_SLOTS: { value: TimeSlot; label: string }[] = [
  { value: TimeSlot.Morning, label: "Morning" },
  { value: TimeSlot.Afternoon, label: "Afternoon" },
  { value: TimeSlot.Evening, label: "Evening" },
];

const DELIVERY_FEE = 500;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useMetroEatsCart();
  const { data: userData, loading: userLoading } = useGetCurrentUserQuery();
  const [createMealOrder, { loading: submitting, error: submitError }] =
    useCreateMealOrderMutation();

  const [addressId, setAddressId] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<TimeSlot>(TimeSlot.Morning);

  const me = userData?.me;
  const addresses = me?.addresses?.filter(Boolean) ?? [];
  const orderTotal = cartTotal + DELIVERY_FEE;

  // useEffect(() => {
  //   if (userLoading) return;
  //   if (!me) {
  //     router.replace(Routes.GET_STARTED);
  //     return;
  //   }
  // }, [me, userLoading, router]);

  useEffect(() => {
    if (addresses.length > 0 && !addressId) {
      const defaultAddr = addresses.find((a) => a?.isDefault) ?? addresses[0];
      if (defaultAddr?.id) setAddressId(defaultAddr.id);
    }
  }, [addresses, addressId]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressId || !deliveryDate || items.length === 0) return;

    const deliveryDateTime =
      new Date(deliveryDate).toISOString?.() ?? deliveryDate;

    try {
      await createMealOrder({
        variables: {
          input: {
            addressId,
            deliveryDate: deliveryDateTime,
            timeSlot,
            items: items.map((line) => ({
              mealId: line.mealId,
              quantity: line.quantity,
              style: line.style as MealStyle,
              ...(line.extras?.length && {
                extras: line.extras.map((e) => ({
                  extraId: e.id,
                  quantity: e.quantity,
                })),
              }),
            })),
          },
        },
      });
      clearCart();
      router.push("/metroeats?order=success");
    } catch {
      // submitError is set by mutation
    }
  };

  // if (userLoading || !me) {
  //   return (
  //     <div className={styles.checkout}>
  //       <div className={styles.checkout__empty}>
  //         <p>Loading…</p>
  //       </div>
  //     </div>
  //   );
  // }

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
          {/* LEFT: Form */}
          <div className={styles.checkout__main}>
            {/* Delivery Address */}
            <div className={styles.checkout__section}>
              <h2 className={styles.checkout__sectionTitle}>
                Delivery Address
              </h2>
              {addresses.length === 0 ? (
                <p className={styles.checkout__summaryItemMeta}>
                  No addresses saved.{" "}
                  <Link href={Routes.DASHBOARD_ADDRESSES}>Add an address</Link>{" "}
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

            {/* Delivery Date */}
            <div className={styles.checkout__section}>
              <h2 className={styles.checkout__sectionTitle}>Delivery Date</h2>
              <div className={styles.checkout__inputGroup}>
                <label htmlFor="deliveryDate">Date</label>
                <input
                  id="deliveryDate"
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  required
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
            </div>

            {/* Time Slot */}
            <div className={styles.checkout__section}>
              <h2 className={styles.checkout__sectionTitle}>Time Slot</h2>
              <div className={styles.checkout__paymentOptions}>
                {TIME_SLOTS.map((slot) => (
                  <label
                    key={slot.value}
                    className={styles.checkout__optionLabel}
                  >
                    <div className={styles.checkout__optionMain}>
                      <input
                        type="radio"
                        name="timeSlot"
                        value={slot.value}
                        checked={timeSlot === slot.value}
                        onChange={() => setTimeSlot(slot.value)}
                      />
                      <span className={styles.checkout__optionText}>
                        {slot.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className={styles.checkout__submitBtnMobile}
              disabled={
                submitting ||
                addresses.length === 0 ||
                !addressId ||
                !deliveryDate
              }
            >
              {submitting
                ? "Placing order…"
                : `Place order — ${fmt(orderTotal)}`}
            </button>
          </div>

          {/* RIGHT: Order Summary */}
          <aside className={styles.checkout__sidebar}>
            <div className={styles.checkout__summaryCard}>
              <h2 className={styles.checkout__summaryTitle}>Order Summary</h2>

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

              {submitError && (
                <p className={styles.checkout__error}>{submitError.message}</p>
              )}

              <button
                type="submit"
                className={styles.checkout__submitBtn}
                disabled={
                  submitting ||
                  addresses.length === 0 ||
                  !addressId ||
                  !deliveryDate
                }
              >
                {submitting ? "Placing order…" : "Place order"}
              </button>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
