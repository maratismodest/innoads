'use client';
import type { User } from '@prisma/client';
import WebApp from '@twa-dev/sdk';
import { ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';

import Popup from '@/components/ui/Popup';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { AuthActionsContext } from '@/providers/AuthProvider/AuthActionsContext';
import { TgUserData, UserWithBans } from '@/types';
import loginTelegram from '@/utils/api/prisma/loginTelegram';

import { AuthContext } from './AuthContext';
import { MESSAGE_TOKEN_ERROR, MESSAGE_USER_BANNED } from './AuthProvider.constants';
import { decodeToken } from './AuthProvider.helpers';

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [message, setMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserWithBans | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [tgUserData, setTgUserData] = useState<TgUserData | null>(null);

  const checkToken = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // проверим наличие токена
      if (token) {
        // пытаемся понять, валидный ли токен
        const decoded = await decodeToken(token);
        // если токен валидный
        if (decoded) {
          console.log('decoded', decoded);
          // создаем/обновляем пользователя
          const res = await loginTelegram(decoded as User);

          // если получилось, то
          if (res) {
            // получаем новый токен и нового пользователя
            const { token, upsertUser } = res;
            // токен - в localStorage, пользователя в state
            login(upsertUser, token);
            // дополнительно проверяем, забанен ли пользователь
            if (upsertUser.bans.length > 0) {
              // если да, то сообщаем ему об этом
              setIsOpen(true);
              setMessage(MESSAGE_USER_BANNED);
              logout();
              return;
            }
          } else {
            logout();
          }
        }
        // если токен не валидный - предлагаем пользователю авторизоваться заново
        else {
          // токен - удаляем из localStorage, пользователь - undefined
          setIsOpen(true);
          setMessage(MESSAGE_TOKEN_ERROR);
          logout();
        }
      }
      return;
    } catch (e) {
      console.log('e', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      if (WebApp.initDataUnsafe.user) {
        setTgUserData(WebApp.initDataUnsafe.user as TgUserData);
      }
    }
  }, []);

  useEffect(() => {
    if (tgUserData && !user && !loading) {
      loginTelegram(tgUserData).then(res => {
        if (res) {
          const { token, upsertUser } = res;
          // токен - в localStorage, пользователя в state
          login(upsertUser, token);
          // дополнительно проверяем, забанен ли пользователь
          if (upsertUser.bans.length > 0) {
            // если да, то сообщаем ему об этом
            setIsOpen(true);
            setMessage(MESSAGE_USER_BANNED);
            logout();
            return;
          }
        }
      });
    }
  }, [tgUserData, user, loading]);

  // @ts-ignore
  useEffect(() => {
    checkToken();
    return () => checkToken();
  }, [checkToken]);

  const login = useCallback((user: UserWithBans, token: string) => {
    localStorage.setItem('token', token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(undefined);
  }, []);

  const actions = useMemo(() => ({ login, logout }), [login, logout]);

  const value = {
    user,
    loading,
    tgUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      <AuthActionsContext.Provider value={actions}>
        <Popup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          text={message}
          buttons={[{ text: 'ОК', onClick: () => setIsOpen(false) }]}
        />
        {children}
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
}
