'use client';
import { createContext } from 'react';

import { UserWithBans } from '@/types';

type authActionsContextType = {
  login: (user: UserWithBans, token: string) => void | undefined;
  logout: () => void | undefined;
};

const authContextDefaultValues: authActionsContextType = {
  login: () => {},
  logout: () => {},
};
export const AuthActionsContext = createContext<authActionsContextType>(authContextDefaultValues);
