import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AUTH_STORAGE_KEY, TEMP_USER } from '../auth/tempAuth';
import { AuthContext } from './AuthContextObject';

type AuthUser = {
  email: string;
  name: string;
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

  const login = ({ email, password }: LoginPayload) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail !== TEMP_USER.email.toLowerCase() ||
      password !== TEMP_USER.password
    ) {
      return {
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      };
    }

    const loggedInUser: AuthUser = {
      email: TEMP_USER.email,
      name: TEMP_USER.name,
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

  const value = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>;
}