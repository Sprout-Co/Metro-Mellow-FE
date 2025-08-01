"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import CartModal, { CartItem } from "./CartModal";
import { ShippingDetails } from "../ShippingDetailsModal/ShippingDetailsModal";

// Sample data for demonstration
const sampleCartItems: CartItem[] = [
  {
    id: "1",
    name: "Fried Rice",
    price: 5400,
    image: "/public/images/food/fried-rice.jpeg",
    quantity: 1,
    variants: ["Beef", "Turkey", "Salad"],
  },
  {
    id: "2",
    name: "Fried Rice",
    price: 5400,
    image: "/public/images/food/fried-rice.jpeg",
    quantity: 1,
    variants: ["Beef", "Turkey", "Salad"],
  },
  {
    id: "3",
    name: "Fried Rice",
    price: 5400,
    image: "/public/images/food/fried-rice.jpeg",
    quantity: 1,
    variants: ["Beef", "Turkey", "Salad"],
  },
];

export default function CartModalExample() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItems);
  const [shippingDetails, setShippingDetails] =
    useState<ShippingDetails | null>(null);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleContinue = (details?: ShippingDetails) => {
    if (details) {
      console.log("Shipping details received:", details);
      setShippingDetails(details);

      // Here you would typically proceed to payment or order confirmation
      console.log("Proceeding to payment with the following order:");
      console.log("Items:", cartItems);
      console.log("Shipping to:", details);
    }

    setIsCartOpen(false);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Cart Modal Example</h1>
      <Button variant="primary" size="lg" onClick={() => setIsCartOpen(true)}>
        Open Cart ({cartItems.length})
      </Button>

      {shippingDetails && (
        <div
          style={{
            marginTop: "2rem",
            textAlign: "left",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <h2>Last Order Shipping Details:</h2>
          <p>
            <strong>Name:</strong> {shippingDetails.fullname}
          </p>
          <p>
            <strong>Address:</strong> {shippingDetails.address}
          </p>
          <p>
            <strong>State:</strong> {shippingDetails.state}
          </p>
          <p>
            <strong>LGA:</strong> {shippingDetails.lga}
          </p>
          <p>
            <strong>Email:</strong> {shippingDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {shippingDetails.phone}
          </p>
        </div>
      )}

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onContinue={handleContinue}
      />
    </div>
  );
}
