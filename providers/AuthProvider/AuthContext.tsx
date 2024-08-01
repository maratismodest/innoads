'use client';
import { createContext } from 'react';

import { UserWithBans } from '@/types';

type authContextType = {
  user: UserWithBans | undefined;
  loading: boolean;
};

const authContextDefaultValues: authContextType = {
  user: undefined,
  loading: false,
};
export const AuthContext = createContext<authContextType>(authContextDefaultValues);
