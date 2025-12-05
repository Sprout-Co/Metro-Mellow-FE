import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  activeTab: string;
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  modalType: string | null;
  modalData: any;
  isServicesListDrawerOpen: boolean;
}

const initialState: UIState = {
  activeTab: "dashboard",
  isSidebarOpen: true,
  isModalOpen: false,
  modalType: null,
  modalData: null,
  isServicesListDrawerOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<{ type: string; data?: any }>) => {
      state.isModalOpen = true;
      state.modalType = action.payload.type;
      state.modalData = action.payload.data || null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
      state.modalData = null;
    },
    openServicesListDrawer: (state) => {
      state.isServicesListDrawerOpen = true;
    },
    closeServicesListDrawer: (state) => {
      state.isServicesListDrawerOpen = false;
    },
  },
});

// Export actions
export const {
  setActiveTab,
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  openServicesListDrawer,
  closeServicesListDrawer,
} = uiSlice.actions;

// Export selectors
export const selectActiveTab = (state: { ui: UIState }) => state.ui.activeTab;
export const selectIsSidebarOpen = (state: { ui: UIState }) =>
  state.ui.isSidebarOpen;
export const selectIsModalOpen = (state: { ui: UIState }) =>
  state.ui.isModalOpen;
export const selectModalType = (state: { ui: UIState }) => state.ui.modalType;
export const selectModalData = (state: { ui: UIState }) => state.ui.modalData;

// Export reducer
export default uiSlice.reducer;
