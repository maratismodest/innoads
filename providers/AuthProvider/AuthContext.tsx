'use client';
import { createContext } from 'react';

import { TgUserData, UserWithBans } from '@/types';

type authContextType = {
  user: UserWithBans | undefined;
  loading: boolean;
  tgUserData: TgUserData | null;
};

const authContextDefaultValues: authContextType = {
  user: undefined,
  loading: false,
  tgUserData: null,
};
export const AuthContext = createContext<authContextType>(authContextDefaultValues);
