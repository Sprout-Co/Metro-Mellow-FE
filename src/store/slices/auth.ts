import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, UserRole } from "@/graphql/api";
import Cookies from "js-cookie";

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

// Custom storage adapter for cookies
const cookieStorage = {
  getItem: (name: string) => {
    const value = Cookies.get(name);
    return value ? value : null;
  },
  setItem: (name: string, value: string) => {
    // Set cookie with path=/ and expires in 30 days
    Cookies.set(name, value, { path: "/", expires: 30 });
  },
  removeItem: (name: string) => {
    Cookies.remove(name, { path: "/" });
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      login: (user, token) => {
        console.log("Auth store: Logging in", { user, token });
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        console.log("Auth store: Logging out");
        set({ user: null, token: null, isAuthenticated: false });
      },
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
      storage: createJSONStorage(() => cookieStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
