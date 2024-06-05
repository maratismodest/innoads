'use client';
import Posts from '@/components/Posts';
import SelectHeadlessUi from '@/components/SelectHeadlessUi';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import useApp from '@/hooks/useApp';
import useDebounce from '@/hooks/useDebounce';
import { defaultSearchValues, ISearchFormInput, schemaSearch } from '@/modules/PostModule/yup';
import inputStyles from '@/styles/inputStyles';
import cleanObject from '@/utils/cleanObject';
import { routes } from '@/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const SearchPage = () => {
  const router = useRouter();
  const { categories } = useApp();
  const searchParams = useSearchParams();
  const refButton = useRef<HTMLButtonElement>(null);

  const methods = useForm<ISearchFormInput>({
    resolver: yupResolver(schemaSearch),
    defaultValues: { ...defaultSearchValues, categoryId: Number(searchParams.get('categoryId')) },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    // setValue,
    // trigger,
    // control,
    watch,
  } = methods;
  const _categoryId = watch('categoryId');
  const _title = watch('title');
  const searchText = useDebounce(_title);

  const { posts, postsLoading, postsError, postsRefetch } = usePostsQuery(
    cleanObject({ published: true, categoryId: _categoryId, search: searchText }),
    false
  );

  const onSubmit = async (data: ISearchFormInput) => {
    const { categoryId } = data;
    const options = cleanObject({
      published: true,
      categoryId: categoryId,
      search: searchText,
    });

    if (categoryId) {
      router.push(routes.search + '?categoryId=' + categoryId);
    }

    await postsRefetch(options);
  };

  // Call submit method in each change
  useEffect(() => {
    if (refButton.current) {
      refButton.current.click();
    }
  }, [_categoryId, searchText]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SelectHeadlessUi options={categories} name="categoryId" />
          <input
            placeholder="Поиск по заголовкам"
            className={clsx(inputStyles(), 'mt-2 w-full')}
            {...register('title')}
            name="title"
          />
          <button type="submit" hidden ref={refButton}>
            Искать
          </button>
        </form>
      </FormProvider>

      <hr />
      <Posts posts={posts} loading={postsLoading} />
    </>
  );
};

export default SearchPage;
