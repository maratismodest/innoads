'use client';
import loginTelegram from '@/utils/api/prisma/loginTelegram';
import { User } from '@prisma/client';
import * as jose from 'jose';
import { useSearchParams } from 'next/navigation';
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

export default function AuthProvider({ children }: Props) {
  const checkToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: jose.JWTPayload = await jose.decodeJwt(token);
        if (decoded) {
          const res = await loginTelegram(decoded as User);
          if (res) {
            const { token, upsertUser } = res;
            login(upsertUser, token);
          } else {
            logout();
          }
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
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [user, setUser] = useState<User | undefined>(undefined);
  console.log('user', user);

  // @ts-ignore
  useEffect(() => {
    console.log('token', token);
    if (token) {
      localStorage.setItem('token', token);
    }
    checkToken();
    return () => checkToken();
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
