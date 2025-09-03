import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import servicesReducer from "./slices/servicesSlice";
import cartReducer from "./slices/cartSlice";

// Create a noop storage for SSR compatibility
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

// Use noop storage in SSR environment, otherwise use localStorage
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Persist configuration for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "isAuthenticated"], // Only persist these fields
};

// Persist configuration for UI slice
const uiPersistConfig = {
  key: "ui",
  storage,
  whitelist: ["activeTab", "isSidebarOpen"], // Persist UI preferences
};

// Persist configuration for cart slice
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"], // Persist cart items
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUiReducer = persistReducer(uiPersistConfig, uiReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Combine all reducers
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  ui: persistedUiReducer,
  services: servicesReducer, // No persistence for services - keep it simple
  cart: persistedCartReducer,
});

// Configure store with Redux Toolkit
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Create persistor for redux-persist
export const persistor = persistStore(store);

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
