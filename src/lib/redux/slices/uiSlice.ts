import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  activeTab: string;
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  modalType: string | null;
  modalData: any;
}

const initialState: UIState = {
  activeTab: 'dashboard',
  isSidebarOpen: true,
  isModalOpen: false,
  modalType: null,
  modalData: null,
};

const uiSlice = createSlice({
  name: 'ui',
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
  },
});

// Export actions
export const { 
  setActiveTab, 
  toggleSidebar, 
  setSidebarOpen, 
  openModal, 
  closeModal 
} = uiSlice.actions;

// Export selectors
export const selectActiveTab = (state: { ui: UIState }) => state.ui.activeTab;
export const selectIsSidebarOpen = (state: { ui: UIState }) => state.ui.isSidebarOpen;
export const selectIsModalOpen = (state: { ui: UIState }) => state.ui.isModalOpen;
export const selectModalType = (state: { ui: UIState }) => state.ui.modalType;
export const selectModalData = (state: { ui: UIState }) => state.ui.modalData;

// Export reducer
export default uiSlice.reducer;