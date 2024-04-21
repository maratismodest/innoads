'use client';
import Arrow from '@/components/Arrow';
import NewSelect from '@/components/ui/NewSelect';
// import Select from '@/components/ui/Select';
import Spinner from '@/components/ui/Spinner';
import useApp from '@/hooks/useApp';
import InfinitePosts from '@/modules/InfinitePosts';
import { Option } from '@/types/global';
import { routes } from '@/utils/constants';
import { Listbox } from '@headlessui/react';
import { clsx } from 'clsx';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { Fragment, useCallback, useEffect, useState } from 'react';

const SearchPage = () => {
  const router = useRouter();
  const { categories } = useApp();
  const searchParams = useSearchParams();
  const search = searchParams.get('categoryId');
  const [category, setCategory] = useState<Option | undefined>();

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
      {/*<Select onChange={handleSelect} defaultValue={category.value} options={categories} />*/}
      <NewSelect options={categories} onChange={handleSelect} value={category} />
      {/*<div className="relative">*/}
      {/*  <Listbox value={category} onChange={handleSelect}>*/}
      {/*    {({ open }) => (*/}
      {/*      <>*/}
      {/*        <Listbox.Button className="flex h-9 w-full items-center justify-between rounded border border-inputBorder px-4 text-start">*/}
      {/*          {category.label}*/}
      {/*          <div className={clsx(open && 'rotate-180 transition ease-in-out')}>*/}
      {/*            <Arrow />*/}
      {/*          </div>*/}
      {/*        </Listbox.Button>*/}
      {/*        <Listbox.Options className="absolute top-10 z-50 w-full rounded bg-white p-2 drop-shadow-md">*/}
      {/*          {categories.map(category => (*/}
      {/*            <Listbox.Option key={category.value} value={category} as={Fragment}>*/}
      {/*              {({ active, selected }) => (*/}
      {/*                <li*/}
      {/*                  className={clsx(*/}
      {/*                    'cursor-pointer rounded p-2',*/}
      {/*                    active && 'bg-blue text-white'*/}
      {/*                  )}*/}
      {/*                >*/}
      {/*                  {category.label}*/}
      {/*                </li>*/}
      {/*              )}*/}
      {/*            </Listbox.Option>*/}
      {/*          ))}*/}
      {/*        </Listbox.Options>*/}
      {/*      </>*/}
      {/*    )}*/}
      {/*  </Listbox>*/}
      {/*</div>*/}
      <hr />
      <InfinitePosts initPage={0} initPosts={[]} options={{ categoryId: category.value }} />
    </>
  );
};

export default SearchPage;
