import { create } from "zustand";

interface Tokens {
  access: string;
  refresh: string;
}

interface AuthState {
  access: string | null;
  refresh: string | null;
  user: unknown;
  setTokens: (tokens: Tokens) => void;
  setUser: (user: unknown) => void;
  clearAuth: () => void;
}

const readInitialToken = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  access: readInitialToken("access"),
  refresh: readInitialToken("refresh"),
  user: null,
  setTokens: ({ access, refresh }) => {
    try {
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    } catch {
      /* ignore storage failures */
    }
    set({ access, refresh });
  },
  setUser: (user) => set({ user }),
  clearAuth: () => {
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    } catch {
      /* ignore storage failures */
    }
    set({ access: null, refresh: null, user: null });
  },
}));
