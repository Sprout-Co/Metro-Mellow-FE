// Store and types
export { store, persistor } from './store';
export type { RootState, AppDispatch } from './store';

// Hooks
export { useAppDispatch, useAppSelector } from './hooks';

// Auth slice
export { 
  setUser, 
  setToken, 
  login, 
  logout,
  selectUser,
  selectToken,
  selectIsAuthenticated,
  selectIsAdmin,
  selectIsStaff,
  selectIsCustomer,
  selectCurrentUser
} from './slices/authSlice';

// UI slice
export {
  setActiveTab,
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  selectActiveTab,
  selectIsSidebarOpen,
  selectIsModalOpen,
  selectModalType,
  selectModalData
} from './slices/uiSlice';