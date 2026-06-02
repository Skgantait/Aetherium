import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: AuthUser | null;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isSignedIn: false,

      login: async (email: string, password: string) => {
        // Simulate API call
        if (!email || !password) {
          throw new Error('Email and password required');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        const user: AuthUser = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
        };

        set({ user, isSignedIn: true });
      },

      signup: async (email: string, password: string, name: string) => {
        // Simulate API call
        if (!email || !password || !name) {
          throw new Error('All fields required');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        const user: AuthUser = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
        };

        set({ user, isSignedIn: true });
      },

      logout: () => {
        set({ user: null, isSignedIn: false });
      },
    }),
    {
      name: 'auth-storage',
      version: 1,
    }
  )
);
