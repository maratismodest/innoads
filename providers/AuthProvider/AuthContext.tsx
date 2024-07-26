'use client';
import { createContext } from 'react';

import { UserWithBans } from '@/types';

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





