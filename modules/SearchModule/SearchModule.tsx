'use client';
import cleanObject from '@/utils/cleanObject';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import useDebounce from '@/hooks/useDebounce';
import inputStyles from '@/styles/inputStyles';
import { routes } from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const SearchModule = () => {
  const [text, setText] = useState<string>('');
  const searchText = useDebounce(text);
  // const ref = useRef<HTMLInputElement>(null);

  const {
    posts = [],
    postsLoading,
    postsError,
    postsRefetch,
  } = usePostsQuery({ search: searchText, published: true }, Boolean(searchText));

  useEffect(() => {
    return () => {
      setText('');
    };
  }, []);

  useEffect(() => {
    if (searchText) {
      postsRefetch(cleanObject({ search: searchText, published: true }));
    }
  }, [searchText]);

  console.log('posts', posts);

  return (
    <section className="relative mt-1">
      <input
        // ref={ref}
        placeholder="Поиск по объявлениям"
        className={clsx(inputStyles(), 'w-full')}
        onChange={e => setText(e.target.value)}
      />
      {searchText && !postsError && !postsLoading && (
        <ul className="absolute -bottom-1 z-50 w-full translate-y-full rounded-lg border-2 border-inputBorder bg-white px-2 py-1">
          {posts && posts.length ? (
            posts.map(x => (
              <li key={x.id} className="truncate">
                <Link href={routes.post + '/' + x.slug} className="">
                  {x.title}: {x.body}
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
};

export default SearchModule;
