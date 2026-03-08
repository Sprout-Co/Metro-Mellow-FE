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

/** Extra add-on selected for a cart line (e.g. extra meat, side). Quantity is independent of meal quantity. */
export interface CartLineExtra {
  id: string;
  name: string;
  price: number;
  quantity: number; // total count for this line (not tied to meal qty)
}

/** One row in the cart — e.g. "Jollof Rice (Plate) × 2, ₦3,000". */
export interface CartLineItem {
  lineId: string; // Unique id so we can update/remove this specific line
  mealId: string; // Links to the meal in the API
  name: string;
  price: number; // Base unit price for this line
  quantity: number;
  style: MealStyle; // Plate or Bowl
  customization?: CartCustomization;
  image?: string; // Meal image for display in cart
  extras?: CartLineExtra[]; // Add-ons with their own quantity (independent of meal qty)
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
    image?: string,
    extras?: CartLineExtra[],
  ) => void;
  removeLine: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  updateLineExtraQuantity: (
    lineId: string,
    extraId: string,
    quantity: number,
  ) => void;
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

/** Returns true if both extra arrays have the same set of extra ids (for merge eligibility). */
function sameExtraIds(
  a: CartLineExtra[] | undefined,
  b: CartLineExtra[] | undefined,
): boolean {
  if (!a?.length && !b?.length) return true;
  if (!a?.length || !b?.length || a.length !== b.length) return false;
  const aIds = a
    .map((e) => e.id)
    .sort()
    .join(",");
  const bIds = b
    .map((e) => e.id)
    .sort()
    .join(",");
  return aIds === bIds;
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
      image?: string,
      extras?: CartLineExtra[],
    ) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (line) =>
            line.mealId === mealId &&
            line.style === style &&
            sameCustomization(line.customization, customization) &&
            sameExtraIds(line.extras, extras),
        );
        if (existingIndex >= 0 && extras?.length) {
          const next = prev.map((line, i) => {
            if (i !== existingIndex) return line;
            const updated = { ...line, quantity: line.quantity + quantity };
            const baseExtras = [...(line.extras ?? [])];
            for (const incoming of extras) {
              const idx = baseExtras.findIndex((e) => e.id === incoming.id);
              if (idx >= 0)
                baseExtras[idx] = {
                  ...baseExtras[idx],
                  quantity: baseExtras[idx].quantity + incoming.quantity,
                };
              else baseExtras.push({ ...incoming });
            }
            updated.extras = baseExtras.length > 0 ? baseExtras : undefined;
            return updated;
          });
          return next;
        }
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
            image,
            extras: extras?.length ? extras : undefined,
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

  const updateLineExtraQuantity = useCallback(
    (lineId: string, extraId: string, quantity: number) => {
      setItems((prev) =>
        prev.map((line) => {
          if (line.lineId !== lineId || !line.extras?.length) return line;
          if (quantity <= 0) {
            const filtered = line.extras.filter((e) => e.id !== extraId);
            return {
              ...line,
              extras: filtered.length > 0 ? filtered : undefined,
            };
          }
          const extras = line.extras.map((e) =>
            e.id === extraId ? { ...e, quantity } : e,
          );
          return { ...line, extras };
        }),
      );
    },
    [],
  );

  const cartCount = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items],
  );
  const cartTotal = useMemo(() => {
    return items.reduce((sum, line) => {
      const baseTotal = line.price * line.quantity;
      const extrasTotal =
        line.extras?.reduce((s, e) => s + e.price * e.quantity, 0) ?? 0;
      return sum + baseTotal + extrasTotal;
    }, 0);
  }, [items]);

  const value = useMemo<MetroEatsCartContextValue>(
    () => ({
      items,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      removeLine,
      updateQuantity,
      updateLineExtraQuantity,
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
      updateLineExtraQuantity,
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
