'use client';
import { ReactNode, useEffect } from 'react';

import useCategoriesQuery from '@/hooks/query/useCategoriesQuery';
import mapCategories from '@/utils/mapCategories';
import { setTheme } from '@/utils/setTheme';

import { AppContext } from './AppContext';

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const { categories = [] } = useCategoriesQuery();

  const value = {
    categories: mapCategories(categories),
  };

  useEffect(() => {
    setTheme();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
