'use client';
import Select from '@/components/ui/Select';
import Spinner from '@/components/ui/Spinner';
import useApp from '@/hooks/useApp';
import InfinitePosts from '@/modules/InfinitePosts';
import { Option } from '@/types/global';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SearchPage = () => {
  const { categories } = useApp();
  const searchParams = useSearchParams();
  const search = searchParams.get('categoryId');
  const [category, setCategory] = useState<Option | undefined>();

  useEffect(() => {
    if (categories.length > 0) {
      const res = categories.find(category => category.value === Number(search)) || categories[0];
      setCategory(res);
    }
  }, [categories, searchParams]);

  if (categories.length === 0 || !category) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Поиск</h1>
      <hr />
      <Select onChange={setCategory} defaultValue={category.value} options={categories} />
      <hr />
      <InfinitePosts initPage={0} initPosts={[]} options={{ categoryId: category.value }} />
    </>
  );
};

export default SearchPage;
