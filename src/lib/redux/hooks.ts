import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  addVariant,
  removeVariant,
  addOption,
  removeOption,
  clearCart,
  setCartOpen,
  setLoading,
  setError,
  setCart,
} from "./slices/cartSlice";
import { CartServiceItem } from "@/components/ui/booking/modals/CartModal";
import { ServiceOption } from "@/graphql/api";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Cart-specific hooks
export const useCart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const isOpen = useAppSelector((state) => state.cart.isOpen);
  const loading = useAppSelector((state) => state.cart.loading);
  const error = useAppSelector((state) => state.cart.error);
  const itemCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const total = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => {
      const basePrice = item.price * item.quantity;
      const optionsPrice =
        item.selectedOptions?.reduce((optSum, option) => {
          return optSum + option.price * item.quantity;
        }, 0) || 0;
      return total + basePrice + optionsPrice;
    }, 0)
  );

  return {
    items,
    isOpen,
    loading,
    error,
    itemCount,
    total,
  };
};

// Hook for cart actions
export const useCartActions = () => {
  const dispatch = useAppDispatch();

  return {
    addToCart: (item: CartServiceItem) => dispatch(addToCart(item)),
    removeFromCart: (itemId: string) => dispatch(removeFromCart(itemId)),
    updateQuantity: (itemId: string, quantity: number) =>
      dispatch(updateQuantity({ itemId, quantity })),
    addVariant: (itemId: string, variant: string) =>
      dispatch(addVariant({ itemId, variant })),
    removeVariant: (itemId: string, variant: string) =>
      dispatch(removeVariant({ itemId, variant })),
    addOption: (itemId: string, option: ServiceOption) =>
      dispatch(addOption({ itemId, option })),
    removeOption: (itemId: string, optionId: string) =>
      dispatch(removeOption({ itemId, optionId })),
    clearCart: () => dispatch(clearCart()),
    setCartOpen: (isOpen: boolean) => dispatch(setCartOpen(isOpen)),
    setLoading: (loading: boolean) => dispatch(setLoading(loading)),
    setError: (error: string | null) => dispatch(setError(error)),
    setCart: (items: CartServiceItem[]) => dispatch(setCart(items)),
  };
};
