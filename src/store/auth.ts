import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole } from "@/graphql/api";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAdmin: boolean;
  isStaff: boolean;
  isCustomer: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      get isAdmin() {
        const user = get().user;
        return (
          user?.role === UserRole.Admin || user?.role === UserRole.SuperAdmin
        );
      },
      get isStaff() {
        return get().user?.role === UserRole.Staff;
      },
      get isCustomer() {
        return get().user?.role === UserRole.Customer;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
