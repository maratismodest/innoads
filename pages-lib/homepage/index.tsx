'use client';
import CustomSelect from '@/components/CustomSelect';
import useApp from '@/hooks/useApp';
import { Option } from '@/types/global';
import { routes } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function HomePageCategories() {
  const router = useRouter();
  const { categories } = useApp();
  const [category, setCategory] = useState();
  const handleSelect = (category: Option) => {
    router.push(routes.search + `?categoryId=${category.value}`);
  };
  return (
    <CustomSelect
      options={categories}
      onChange={(category: any) => {
        console.log('category', category);
        setCategory(category);
        handleSelect(category);
      }}
      value={category}
    />
  );
}
