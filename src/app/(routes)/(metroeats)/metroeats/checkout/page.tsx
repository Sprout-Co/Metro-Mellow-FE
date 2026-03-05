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
import { useMetroEatsCart } from "../_context/MetroEatsCartContext";
import { Routes } from "@/constants/routes";

const TIME_SLOTS: { value: TimeSlot; label: string }[] = [
  { value: TimeSlot.Morning, label: "Morning" },
  { value: TimeSlot.Afternoon, label: "Afternoon" },
  { value: TimeSlot.Evening, label: "Evening" },
];

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function MetroEatsCheckoutPage() {
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

  useEffect(() => {
    if (userLoading) return;
    if (!me) {
      router.replace(Routes.GET_STARTED);
      return;
    }
  }, [me, userLoading, router]);

  useEffect(() => {
    if (addresses.length > 0 && !addressId) {
      const defaultAddr = addresses.find((a) => a?.id) ?? addresses[0];
      if (defaultAddr?.id) setAddressId(defaultAddr.id);
    }
  }, [addresses, addressId]);

  if (userLoading || !me) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Your cart is empty.</p>
        <Link href="/metroeats/menu">Browse menu</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressId || !deliveryDate) return;

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

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "2rem 1rem" }}>
      <Link href="/metroeats/menu" style={{ marginBottom: "1rem", display: "inline-block" }}>
        ← Back to menu
      </Link>
      <h1 style={{ marginBottom: "1.5rem" }}>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1.5rem" }}>
          <label htmlFor="address" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
            Delivery address
          </label>
          {addresses.length === 0 ? (
            <p>
              No addresses saved.{" "}
              <Link href="/dashboard/addresses">Add an address</Link> first.
            </p>
          ) : (
            <select
              id="address"
              value={addressId}
              onChange={(e) => setAddressId(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            >
              <option value="">Select address</option>
              {addresses.map((addr) =>
                addr ? (
                  <option key={addr.id} value={addr.id}>
                    {addr.label || [addr.street, addr.city, addr.state].filter(Boolean).join(", ")}
                  </option>
                ) : null
              )}
            </select>
          )}
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label htmlFor="deliveryDate" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
            Delivery date
          </label>
          <input
            id="deliveryDate"
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
            min={new Date().toISOString().slice(0, 10)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <span style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
            Time slot
          </span>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {TIME_SLOTS.map((slot) => (
              <label key={slot.value} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <input
                  type="radio"
                  name="timeSlot"
                  value={slot.value}
                  checked={timeSlot === slot.value}
                  onChange={() => setTimeSlot(slot.value)}
                />
                {slot.label}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "#f5f5f5", borderRadius: 8 }}>
          <strong>Order total: {fmt(cartTotal)}</strong>
          <p style={{ margin: "0.5rem 0 0", fontSize: "0.9rem" }}>
            {items.length} item{items.length !== 1 ? "s" : ""}
          </p>
        </div>

        {submitError && (
          <p style={{ color: "crimson", marginBottom: "1rem" }}>
            {submitError.message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || addresses.length === 0 || !addressId || !deliveryDate}
          style={{ padding: "0.75rem 1.5rem", fontWeight: 600, cursor: submitting ? "wait" : "pointer" }}
        >
          {submitting ? "Placing order…" : "Place order"}
        </button>
      </form>
    </div>
  );
}
