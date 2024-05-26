'use client';
import Popup from '@/components/ui/Popup';
import { UserWithBans } from '@/types';
import loginTelegram from '@/utils/api/prisma/loginTelegram';
import { User } from '@prisma/client';
import * as jose from 'jose';
import { useSearchParams } from 'next/navigation';
import { createContext, ReactNode, useCallback, useState, useEffect } from 'react';

type authContextType = {
  user: UserWithBans | undefined;
  login: (user: UserWithBans, token: string) => void | undefined;
  logout: () => void | undefined;
  loading: boolean;
};

const authContextDefaultValues: authContextType = {
  user: undefined,
  login: () => {},
  logout: () => {},
  loading: false,
};
export const AuthContext = createContext<authContextType>(authContextDefaultValues);

type Props = {
  children: ReactNode;
};

const MESSAGE_TOKEN_ERROR =
  'Что-то пошло не так: попробуйте перезапустить сайт/бота и авторизоваться заново';
const MESSAGE_USER_BANNED = 'Ваш аккаунт заблокирован';

const decodeToken = async (token: string) => {
  try {
    const decoded: jose.JWTPayload = await jose.decodeJwt(token);
    return decoded;
  } catch (error) {
    console.error('decodeToken', error);
  }
};

export default function AuthProvider({ children }: Props) {
  const [message, setMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [user, setUser] = useState<UserWithBans | undefined>(undefined);
  const [loading, setLoading] = useState(false);
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

  // @ts-ignore
  useEffect(() => {
    console.log('token', token);
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('telegram', '1');
    }
    checkToken();
    return () => checkToken();
  }, []);

  const login = (user: UserWithBans, token: string) => {
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
    loading,
  };
  return (
    <AuthContext.Provider value={value}>
      <Popup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={message}
        buttons={[{ text: 'ОК', onClick: () => setIsOpen(false) }]}
      />
      {children}
    </AuthContext.Provider>
  );
}
