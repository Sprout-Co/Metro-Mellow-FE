import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartServiceItem } from "@/components/ui/booking/modals/CartModal";
import { ServiceOption } from "@/graphql/api";

interface CartState {
  items: CartServiceItem[];
  isOpen: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action: PayloadAction<CartServiceItem>) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === newItem._id
      );

      if (existingItemIndex >= 0) {
        // Item already exists, increment quantity
        state.items[existingItemIndex].quantity += newItem.quantity || 1;
      } else {
        // Add new item
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
        });
      }
    },

    // Remove item from cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);
    },

    // Update item quantity
    updateQuantity: (
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>
    ) => {
      const { itemId, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item._id === itemId);

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = quantity;
        }
      }
    },

    // Add variant to item
    addVariant: (
      state,
      action: PayloadAction<{ itemId: string; variant: string }>
    ) => {
      const { itemId, variant } = action.payload;
      const item = state.items.find((item) => item._id === itemId);

      if (item) {
        if (!item.selectedVariants) {
          item.selectedVariants = [];
        }
        if (!item.selectedVariants.includes(variant)) {
          item.selectedVariants.push(variant);
        }
      }
    },

    // Remove variant from item
    removeVariant: (
      state,
      action: PayloadAction<{ itemId: string; variant: string }>
    ) => {
      const { itemId, variant } = action.payload;
      const item = state.items.find((item) => item._id === itemId);

      if (item && item.selectedVariants) {
        item.selectedVariants = item.selectedVariants.filter(
          (v) => v !== variant
        );
      }
    },

    // Add option to item
    addOption: (
      state,
      action: PayloadAction<{ itemId: string; option: ServiceOption }>
    ) => {
      const { itemId, option } = action.payload;
      const item = state.items.find((item) => item._id === itemId);

      if (item) {
        if (!item.selectedOptions) {
          item.selectedOptions = [];
        }
        // Check if option already exists
        const existingOptionIndex = item.selectedOptions.findIndex(
          (opt) => opt.id === option.id
        );
        if (existingOptionIndex >= 0) {
          // Update existing option
          item.selectedOptions[existingOptionIndex] = option;
        } else {
          // Add new option
          item.selectedOptions.push(option);
        }
      }
    },

    // Remove option from item
    removeOption: (
      state,
      action: PayloadAction<{ itemId: string; optionId: string }>
    ) => {
      const { itemId, optionId } = action.payload;
      const item = state.items.find((item) => item._id === itemId);

      if (item && item.selectedOptions) {
        item.selectedOptions = item.selectedOptions.filter(
          (opt) => opt.id !== optionId
        );
      }
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
    },

    // Set cart open/closed
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Replace entire cart (useful for syncing with backend)
    setCart: (state, action: PayloadAction<CartServiceItem[]>) => {
      state.items = action.payload;
    },
  },
});

// Export actions
export const {
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
} = cartSlice.actions;

// Export selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartIsOpen = (state: { cart: CartState }) =>
  state.cart.isOpen;
export const selectCartLoading = (state: { cart: CartState }) =>
  state.cart.loading;
export const selectCartError = (state: { cart: CartState }) => state.cart.error;

// Selector for cart item count
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Selector for cart total price
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => {
    const basePrice = item.price * item.quantity;
    const optionsPrice =
      item.selectedOptions?.reduce((optSum, option) => {
        return optSum + option.price * item.quantity;
      }, 0) || 0;
    return total + basePrice + optionsPrice;
  }, 0);

// Selector for cart subtotal (without options)
export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

// Selector for options total
export const selectCartOptionsTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => {
    const optionsPrice =
      item.selectedOptions?.reduce((optSum, option) => {
        return optSum + option.price * item.quantity;
      }, 0) || 0;
    return total + optionsPrice;
  }, 0);

// Selector to check if cart is empty
export const selectIsCartEmpty = (state: { cart: CartState }) =>
  state.cart.items.length === 0;

// Selector to get a specific cart item
export const selectCartItem =
  (itemId: string) => (state: { cart: CartState }) =>
    state.cart.items.find((item) => item._id === itemId);

export default cartSlice.reducer;
