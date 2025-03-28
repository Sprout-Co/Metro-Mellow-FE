import { createStore } from "@/lib/zustand/createStore";

interface UIState {
  activeTab: string;
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  modalType: string | null;
  setActiveTab: (tab: string) => void;
  toggleSidebar: () => void;
  openModal: (type: string) => void;
  closeModal: () => void;
}

const initialState = {
  activeTab: "dashboard",
  isSidebarOpen: true,
  isModalOpen: false,
  modalType: null,
};

export const useUIStore = createStore<UIState>(
  "ui-store",
  initialState,
  (set) => ({
    setActiveTab: (tab) => set({ activeTab: tab }),
    toggleSidebar: () =>
      set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    openModal: (type) => set({ isModalOpen: true, modalType: type }),
    closeModal: () => set({ isModalOpen: false, modalType: null }),
  })
);
