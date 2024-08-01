'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Select from '@/components/ui/Select';
import useApp from '@/hooks/provider/useApp';
import type { Option } from '@/types';
import { routes } from '@/utils/constants';

export default function HomePageCategories() {
  const router = useRouter();
  const { categories } = useApp();
  const [category, setCategory] = useState();
  const handleSelect = (category: Option) => {
    router.push(routes.search + `?categoryId=${category.value}`);
  };
  return (
    <Select
      options={categories}
      onChange={(category: any) => {
        setCategory(category);
        handleSelect(category);
      }}
      value={category}
    />
  );
}
