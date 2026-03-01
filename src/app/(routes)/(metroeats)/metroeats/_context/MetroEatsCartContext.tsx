"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export interface CartCustomization {
  protein?: string;
  notes?: string;
}

export interface CartLineItem {
  lineId: string;
  mealId: string;
  name: string;
  price: number;
  quantity: number;
  customization?: CartCustomization;
}

interface MetroEatsCartContextValue {
  items: CartLineItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    mealId: string,
    name: string,
    price: number,
    quantity?: number,
    customization?: CartCustomization
  ) => void;
  removeLine: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
  // Customization modal
  customizationMeal: { mealId: string; name: string; price: number } | null;
  openCustomize: (mealId: string, name: string, price: number) => void;
  closeCustomize: () => void;
}

const MetroEatsCartContext = createContext<MetroEatsCartContextValue | null>(null);

function generateLineId() {
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function sameCustomization(
  a: CartCustomization | undefined,
  b: CartCustomization | undefined
): boolean {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return (a.protein ?? "") === (b.protein ?? "") && (a.notes ?? "") === (b.notes ?? "");
}

export function MetroEatsCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizationMeal, setCustomizationMeal] = useState<{
    mealId: string;
    name: string;
    price: number;
  } | null>(null);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openCustomize = useCallback(
    (mealId: string, name: string, price: number) => {
      setCustomizationMeal({ mealId, name, price });
    },
    []
  );
  const closeCustomize = useCallback(() => setCustomizationMeal(null), []);

  const addItem = useCallback(
    (
      mealId: string,
      name: string,
      price: number,
      quantity = 1,
      customization?: CartCustomization
    ) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (line) =>
            line.mealId === mealId && sameCustomization(line.customization, customization)
        );
        if (existingIndex >= 0) {
          const next = [...prev];
          next[existingIndex].quantity += quantity;
          return next;
        }
        return [
          ...prev,
          {
            lineId: generateLineId(),
            mealId,
            name,
            price,
            quantity,
            customization,
          },
        ];
      });
    },
    []
  );

  const removeLine = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((line) => line.lineId !== lineId));
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((line) => line.lineId !== lineId);
      }
      return prev.map((line) =>
        line.lineId === lineId ? { ...line, quantity } : line
      );
    });
  }, []);

  const cartCount = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items]
  );
  const cartTotal = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [items]
  );

  const value = useMemo<MetroEatsCartContextValue>(
    () => ({
      items,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      removeLine,
      updateQuantity,
      cartCount,
      cartTotal,
      customizationMeal,
      openCustomize,
      closeCustomize,
    }),
    [
      items,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      removeLine,
      updateQuantity,
      cartCount,
      cartTotal,
      customizationMeal,
      openCustomize,
      closeCustomize,
    ]
  );

  return (
    <MetroEatsCartContext.Provider value={value}>
      {children}
    </MetroEatsCartContext.Provider>
  );
}

export function useMetroEatsCart() {
  const ctx = useContext(MetroEatsCartContext);
  if (!ctx) {
    throw new Error("useMetroEatsCart must be used within MetroEatsCartProvider");
  }
  return ctx;
}
