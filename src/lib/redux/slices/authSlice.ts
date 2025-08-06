import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole } from '@/graphql/api';
import Cookies from 'js-cookie';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Custom cookie storage utilities
const cookieStorage = {
  getItem: (name: string) => {
    const value = Cookies.get(name);
    return value ? value : null;
  },
  setItem: (name: string, value: string) => {
    Cookies.set(name, value, {
      path: "/",
      expires: 30,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },
  removeItem: (name: string) => {
    Cookies.remove(name, { path: "/" });
  },
};

const initialState: AuthState = {
  user: null,
  token: cookieStorage.getItem("auth-token"),
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      console.log("setting user")
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      const token = action.payload;
      state.token = token;
      
      // Handle cookie storage
      if (token) {
        cookieStorage.setItem("auth-token", token);
      } else {
        cookieStorage.removeItem("auth-token");
      }
    },
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload;
      console.log("Auth store: Logging in", { user, token });
      
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      
      // Save token to cookie
      cookieStorage.setItem("auth-token", token);
    },
    logout: (state) => {
      console.log("Auth store: Logging out");
      
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      // Remove tokens from cookies
      cookieStorage.removeItem("auth-token");
      cookieStorage.removeItem("auth-storage");
    },
  },
});

// Export actions
export const { setUser, setToken, login, logout } = authSlice.actions;

// Export selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;

// Role-based selectors
export const selectIsAdmin = (state: { auth: AuthState }) => {
  const user = state.auth.user;
  return user?.role === UserRole.Admin || user?.role === UserRole.SuperAdmin;
};

export const selectIsStaff = (state: { auth: AuthState }) => {
  return state.auth.user?.role === UserRole.Staff;
};

export const selectIsCustomer = (state: { auth: AuthState }) => {
  return state.auth.user?.role === UserRole.Customer;
};

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;

// Export reducer
export default authSlice.reducer;