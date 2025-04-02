import { createStore } from "@/lib/zustand/createStore";

interface UIState {
  activeTab: string;
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  modalType: string | null;
  modalData: any;
  setActiveTab: (tab: string) => void;
  toggleSidebar: () => void;
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;
}

const initialState = {
  activeTab: "dashboard",
  isSidebarOpen: true,
  isModalOpen: false,
  modalType: null,
  modalData: null,
};

export const useUIStore = createStore<UIState>(
  "ui-store",
  initialState,
  (set) => ({
    setActiveTab: (tab) => set({ activeTab: tab }),
    toggleSidebar: () =>
      set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    openModal: (type, data) =>
      set({ isModalOpen: true, modalType: type, modalData: data }),
    closeModal: () =>
      set({ isModalOpen: false, modalType: null, modalData: null }),
  })
);
