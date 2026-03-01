"use client";

import React from "react";
import { MetroEatsCartProvider as CartProvider } from "../../_context/MetroEatsCartContext";
import CartDrawer from "../CartDrawer/CartDrawer";
import CustomizeModal from "../CustomizeModal/CustomizeModal";

export default function MetroEatsCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <CustomizeModal />
    </CartProvider>
  );
}
