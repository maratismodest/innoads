'use client';
import { cleanObject } from '@/app/api/posts/route';
import Select from '@/components/ui/Select';
import Spinner from '@/components/ui/Spinner';
import useApp from '@/hooks/useApp';
import useDebounce from '@/hooks/useDebounce';
import InfinitePosts from '@/modules/InfinitePosts';
import inputStyles from '@/styles/inputStyles';
import { Option } from '@/types/global';
import { routes } from '@/utils/constants';
import clsx from 'clsx';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

const SearchPage = () => {
  const router = useRouter();
  const { categories } = useApp();
  const searchParams = useSearchParams();
  const search = searchParams.get('categoryId');
  const [category, setCategory] = useState<Option | undefined>();
  const [text, setText] = useState<string>('');
  const searchText = useDebounce(text, 1000);

  const handleSelect = useCallback((active: Option) => {
    router.push(routes.search + '?categoryId=' + active.value);
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const res = categories.find(category => category.value === Number(search)) || categories[0];
      setCategory(res);
    }
  }, [categories, search]);

  if (categories.length === 0 || !category) {
    return <Spinner />;
  }

  return (
    <>
      <Select options={categories} onChange={handleSelect} value={category} />
      <input
        placeholder="Поиск по заголовкам"
        className={clsx(inputStyles(), 'mt-4')}
        onChange={e => setText(e.target.value)}
      />
      <hr />
      <InfinitePosts
        initPage={0}
        initPosts={[]}
        options={cleanObject({ categoryId: category.value, published: true, search: searchText })}
      />
    </>
  );
};

export default SearchPage;
