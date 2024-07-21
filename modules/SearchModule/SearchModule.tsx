'use client';
import { RefetchOptions } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import React, { ComponentPropsWithoutRef, useEffect, useMemo, useRef, useState } from 'react';

import usePostsQuery from '@/hooks/query/usePostsQuery';
import useDebounce from '@/hooks/useDebounce';
import inputStyles from '@/styles/inputStyles';
import { GetPostsParams } from '@/utils/api/prisma/fetchAds';
import cleanObject from '@/utils/cleanObject';
import { routes } from '@/utils/constants';

const initialOptions: Partial<GetPostsParams> = {
  published: true,
  search: '',
};

interface SearchModuleProps extends ComponentPropsWithoutRef<'section'> {}

export function SearchModule({ className }: SearchModuleProps) {
  const [text, setText] = useState('');
  const searchText = useDebounce(text);
  const ref = useRef<HTMLButtonElement>(null);

  const options: Partial<GetPostsParams> = useMemo(
    () => cleanObject({ ...initialOptions, search: searchText }),
    [searchText]
  );

  const { posts = [], postsLoading, postsError, postsRefetch } = usePostsQuery(options, false);

  useEffect(() => {
    return () => {
      setText('');
    };
  }, []);

  useEffect(() => {
    if (searchText) {
      ref.current?.click();
    }
  }, [searchText]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postsRefetch(options as RefetchOptions).then(() => console.info('posts', posts));
  };

  return (
    <section className={clsx('relative', className)}>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Поиск по объявлениям"
          className={clsx(inputStyles(), 'w-full')}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit" hidden ref={ref}>
          hidden
        </button>
      </form>

      {searchText && !postsError && !postsLoading && (
        <ul className="absolute -bottom-1 z-50 grid w-full translate-y-full grid-cols-1 gap-1 rounded-lg border-2 border-inputBorder bg-white px-2 py-1">
          {posts && posts.length ? (
            posts.map(({ id, title, slug, body }) => (
              <li key={id} className="truncate">
                <Link href={routes.post + '/' + slug}>
                  {title}: {body}
                </Link>
              </li>
            ))
          ) : (
            <li>нет совпадений</li>
          )}
        </ul>
      )}
    </section>
  );
}
