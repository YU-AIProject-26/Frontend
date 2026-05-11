import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  AUTH_STORAGE_KEY,
  ONBOARDING_STORAGE_KEY,
  TEMP_USERS,
} from '../auth/tempAuth';
import { AuthContext } from './AuthContextObject';

type AuthUser = {
  email: string;
  name: string;
  role: 'user' | 'admin';
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser) as AuthUser;
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true';
  });

  const login = ({ email, password }: LoginPayload) => {
    const normalizedEmail = email.trim().toLowerCase();

    const matchedUser = TEMP_USERS.find(
      (tempUser) =>
        tempUser.email.toLowerCase() === normalizedEmail &&
        tempUser.password === password
    );

    if (!matchedUser) {
      return {
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      };
    }

    const loggedInUser: AuthUser = {
      email: matchedUser.email,
      name: matchedUser.name,
      role: matchedUser.role,
    };

    setUser(loggedInUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));

    return {
      success: true,
      message: '로그인에 성공했습니다.',
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
  };

  const resetOnboarding = () => {
    setHasCompletedOnboarding(false);
    localStorage.removeItem(ONBOARDING_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      login,
      logout,
      hasCompletedOnboarding,
      completeOnboarding,
      resetOnboarding,
    }),
    [user, hasCompletedOnboarding]
  );

  return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>;
}