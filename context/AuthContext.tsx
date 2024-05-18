'use client';
import fetchUser from '@/utils/api/prisma/fetchUser';
import { User } from '@prisma/client';
import * as jose from 'jose';
import { createContext, ReactNode, useEffect, useState } from 'react';

type authContextType = {
  user: User | undefined;
  login: (user: User, token: string) => void | undefined;
  logout: () => void | undefined;
};

const authContextDefaultValues: authContextType = {
  user: undefined,
  login: () => {},
  logout: () => {},
};
export const AuthContext = createContext<authContextType>(authContextDefaultValues);

type Props = {
  children: ReactNode;
};

export const checkToken = async (login: any, logout: any) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: jose.JWTPayload = await jose.decodeJwt(token);
      const fetchedUser = await fetchUser(decoded.id as number);
      if (fetchedUser) {
        login(fetchedUser, token);
      } else {
        logout();
        alert(
          'Вы слишком давно авторизовывались: попробуйте перезапустить страницу и авторизоваться заново'
        );
      }
    }
    return;
  } catch (e) {
    console.log('e', e);
  }
};

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>(undefined);

  // @ts-ignore
  useEffect(() => {
    checkToken(login, logout);
    return () => checkToken(login, logout);
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(undefined);
  };

  const value = {
    user,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
