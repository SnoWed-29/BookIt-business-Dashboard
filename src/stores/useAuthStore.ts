import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  role: string;
  [key: string]: any;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,

  login: (token, user) => {
    set({ user, token });
  },

  logout: () => {
    set({ user: null, token: null });
  },

  isAuthenticated: () => {
    return !!get().token;
  },
}));