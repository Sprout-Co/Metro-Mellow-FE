"use client";

import { Meal, MealStyle } from "@/graphql/api";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

/** User-selected extras for a cart line (e.g. protein choice, special instructions). */
export interface CartCustomization {
  protein?: string;
  notes?: string;
}

/** One row in the cart — e.g. "Jollof Rice (Plate) × 2, ₦3,000". */
export interface CartLineItem {
  lineId: string; // Unique id so we can update/remove this specific line
  mealId: string; // Links to the meal in the API
  name: string;
  price: number; // Unit price for this line
  quantity: number;
  style: MealStyle; // Plate or Bowl
  customization?: CartCustomization;
}

/** Meal plus extra props for the customize modal. Add any fields you need here. */
export type MealToCustomize = Meal & {
  selectedStyle: MealStyle;
  selectedPrice: number;
  // e.g. selectedPrice?: number; customNote?: string;
};

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
    customization?: CartCustomization,
    style?: MealStyle,
  ) => void;
  removeLine: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  // Customization modal
  mealToCustomize: MealToCustomize | null;
  openCustomizeMealModal: (meal: MealToCustomize) => void;
  closeCustomizeMealModal: () => void;
}

/** Cart state and actions. Wrap MetroEats routes with MetroEatsCartProvider, then use useMetroEatsCart(). */
const MetroEatsCartContext = createContext<MetroEatsCartContextValue | null>(
  null,
);

function generateLineId() {
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Returns true if both customizations are equivalent. Used to decide whether to merge a new add into an existing cart line. */
function sameCustomization(
  a: CartCustomization | undefined,
  b: CartCustomization | undefined,
): boolean {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return (
    (a.protein ?? "") === (b.protein ?? "") &&
    (a.notes ?? "") === (b.notes ?? "")
  );
}

export function MetroEatsCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mealToCustomize, setMealToCustomize] =
    useState<MealToCustomize | null>(null);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openCustomizeMealModal = useCallback((meal: MealToCustomize) => {
    setMealToCustomize(meal);
  }, []);
  const closeCustomizeMealModal = useCallback(
    () => setMealToCustomize(null),
    [],
  );

  const addItem = useCallback(
    (
      mealId: string,
      name: string,
      price: number,
      quantity = 1,
      customization?: CartCustomization,
      style: MealStyle = MealStyle.Plate,
    ) => {
      setItems((prev) => {
        // If same meal + style + customization already in cart, bump quantity instead of adding a new line
        const existingIndex = prev.findIndex(
          (line) =>
            line.mealId === mealId &&
            line.style === style &&
            sameCustomization(line.customization, customization),
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
            style,
            customization,
          },
        ];
      });
    },
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const removeLine = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((line) => line.lineId !== lineId));
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((line) => line.lineId !== lineId);
      }
      return prev.map((line) =>
        line.lineId === lineId ? { ...line, quantity } : line,
      );
    });
  }, []);

  const cartCount = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items],
  );
  const cartTotal = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [items],
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
      clearCart,
      cartCount,
      cartTotal,
      mealToCustomize,
      openCustomizeMealModal,
      closeCustomizeMealModal,
    }),
    [
      items,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      removeLine,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      mealToCustomize,
      openCustomizeMealModal,
      closeCustomizeMealModal,
    ],
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
    throw new Error(
      "useMetroEatsCart must be used within MetroEatsCartProvider",
    );
  }
  return ctx;
}
