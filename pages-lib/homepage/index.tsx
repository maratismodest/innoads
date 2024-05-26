'use client';
import Select from '@/components/ui/Select';
import useApp from '@/hooks/useApp';
import { Option } from '@/types/global';
import { routes } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const HomePageCategories = () => {
  const router = useRouter();
  const { categories } = useApp();
  const [category, setCategory] = useState();
  const handleSelect = (category: Option) => {
    console.log('category', category);
    router.push(routes.search + `?categoryId=${category.value}`);
  };
  return <Select options={categories} onChange={handleSelect} value={category} />;
};

export default HomePageCategories;
