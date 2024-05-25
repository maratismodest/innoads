'use client';
import { cleanObject } from '@/app/api/posts/route';
import PostsReadOnly from '@/components/PostsReadOnly';
import Select from '@/components/ui/Select';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import useApp from '@/hooks/useApp';
import useDebounce from '@/hooks/useDebounce';
import inputStyles from '@/styles/inputStyles';
import { Option } from '@/types/global';
import { routes } from '@/utils/constants';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const SearchPage = () => {
  const router = useRouter();
  const { categories } = useApp();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const [category, setCategory] = useState<Option | undefined>();
  const [text, setText] = useState<string>('');
  const searchText = useDebounce(text);

  const handleSelect = useCallback((active: Option) => {
    router.push(routes.search + '?categoryId=' + active.value);
  }, []);

  const options = useMemo(
    () =>
      cleanObject({
        published: true,
        categoryId: category?.value,
        search: searchText,
      }),
    [category, searchText]
  );

  const { posts, postsLoading, postsError, postsRefetch } = usePostsQuery(
    options,
    Boolean(category)
  );

  useEffect(() => {
    if (category) {
      console.log('HERE', options);
      postsRefetch(options);
    }
  }, [category, searchText]);

  useEffect(() => {
    if (categories.length > 0) {
      const res = categories.find(category => category.value === Number(categoryId));
      setCategory(res);
    }
  }, [categories, categoryId]);

  console.log('options', options);

  return (
    <>
      <Select options={categories} onChange={handleSelect} value={category} />
      <input
        placeholder="Поиск по заголовкам"
        className={clsx(inputStyles(), 'mt-4')}
        onChange={e => setText(e.target.value)}
      />
      <hr />
      <PostsReadOnly posts={posts} loading={postsLoading} error={postsError} />
    </>
  );
};

export default SearchPage;
