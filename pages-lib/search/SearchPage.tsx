'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import Posts from '@/components/Posts';
import Select from '@/components/ui/Select';
import useApp from '@/hooks/provider/useApp';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import useDebounce from '@/hooks/useDebounce';
import inputStyles from '@/styles/inputStyles';
import cleanObject from '@/utils/cleanObject';
import { routes } from '@/utils/constants';

import { defaultSearchValues, ISearchFormInput, schemaSearch } from './yup';

const SearchPage = () => {
  const router = useRouter();
  const { categories } = useApp();
  const searchParams = useSearchParams();
  const routerCategoryId = searchParams.get('categoryId');
  const refButton = useRef<HTMLButtonElement>(null);

  const methods = useForm<ISearchFormInput>({
    resolver: yupResolver(schemaSearch),
    defaultValues: defaultSearchValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = methods;
  const categoryId = watch('categoryId');
  const title = watch('title');
  const searchText = useDebounce(title);

  const { posts, postsLoading, postsError, postsRefetch } = usePostsQuery(
    cleanObject({ categoryId, search: searchText, published: true }),
    Boolean(categoryId)
  );

  const onSubmit = async (data: ISearchFormInput) => {
    const { categoryId } = data;
    await postsRefetch();
    if (categoryId) {
      router.push(routes.search + '?categoryId=' + categoryId);
    }
  };

  useEffect(() => {
    if (routerCategoryId) {
      setValue('categoryId', Number(routerCategoryId));
    }
  }, []);

  // Call submit method in each change
  useEffect(() => {
    if (refButton.current && categoryId) {
      refButton.current.click();
    }
  }, [categoryId, searchText]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                options={categories}
                value={value}
                // It should be Option
                onChange={(active: any) => onChange(Number(active.value))}
              />
            )}
          />
          <input
            placeholder="Поиск по заголовкам"
            className={clsx(inputStyles(), 'mt-2 w-full')}
            {...register('title')}
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
