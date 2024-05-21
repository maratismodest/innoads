'use client';
import { Option } from '@/types/global';
import fetchCategories from '@/utils/api/prisma/fetchCategories';
import mapCategories from '@/utils/mapCategories';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

type appContextType = {
  categories: Option[];
  setCategories: Dispatch<SetStateAction<Option[]>>;
};

const appContextDefaultValues: appContextType = {
  categories: [],
  setCategories: () => {},
};
export const AppContext = createContext<appContextType>(appContextDefaultValues);

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const [categories, setCategories] = useState<Option[]>([]);

  useEffect(() => {
    fetchCategories().then(res => setCategories(mapCategories(res)));
  }, []);

  const value = {
    categories,
    setCategories,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
