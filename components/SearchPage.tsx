'use client';
import Select from '@/components/ui/Select';
import InfinitePosts from '@/modules/InfinitePosts';
import { categories, CategoryProps } from '@/utils/categories';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('categoryId');
  const [category, setCategory] = useState<CategoryProps>(
    categories.find(category => category.value === Number(search)) || categories[0],
  );
  return (
    <>
      <h1>Поиск</h1>
      <hr />
      <Select onChange={setCategory} defaultValue={category.value} />
      <hr />
      <InfinitePosts initPage={0} initPosts={[]} options={{ categoryId: category.value }} />
    </>
  );
};

export default SearchPage;
