import { createContext } from 'react';

import type { Option } from '@/types';

type appContextType = {
  categories: Option[];
};

const appContextDefaultValues: appContextType = {
  categories: [],
};

export const AppContext = createContext<appContextType>(appContextDefaultValues);
