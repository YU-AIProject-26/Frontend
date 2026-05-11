import { createContext } from 'react';

type AuthUser = {
  email: string;
  name: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (payload: LoginPayload) => { success: boolean; message: string };
  logout: () => void;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);