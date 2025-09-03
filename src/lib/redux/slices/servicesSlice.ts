import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service } from "@/graphql/api";

interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  loading: false,
  error: null,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
      state.loading = false;
      state.error = null;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions
export const { setLoading, setServices, setError } = servicesSlice.actions;

// Export selectors
export const selectServices = (state: { services: ServicesState }) =>
  state.services.services;
export const selectServicesLoading = (state: { services: ServicesState }) =>
  state.services.loading;
export const selectServicesError = (state: { services: ServicesState }) =>
  state.services.error;

// Export reducer
export default servicesSlice.reducer;
