'use client';
import useCategoriesQuery from '@/hooks/query/useCategoriesQuery';
import { Option } from '@/types/global';
import mapCategories from '@/utils/mapCategories';
import { setTheme } from '@/utils/spaghetti';
import { createContext, ReactNode, useEffect } from 'react';

type appContextType = {
  categories: Option[];
};

const appContextDefaultValues: appContextType = {
  categories: [],
};
export const AppContext = createContext<appContextType>(appContextDefaultValues);

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const { categories = [] } = useCategoriesQuery();

  const value = {
    categories: mapCategories(categories),
  };

  useEffect(() => {
    setTheme();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
