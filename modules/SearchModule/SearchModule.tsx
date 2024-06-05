'use client';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import useDebounce from '@/hooks/useDebounce';
import inputStyles from '@/styles/inputStyles';
import { GetPostsParams } from '@/utils/api/prisma/fetchAds';
import cleanObject from '@/utils/cleanObject';
import { routes } from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const initialOptions: Partial<GetPostsParams> = {
  published: true,
  search: undefined,
};

export default function SearchModule() {
  const [text, setText] = useState('');
  const searchText = useDebounce(text);

  const {
    posts = [],
    postsLoading,
    postsError,
    postsRefetch,
  } = usePostsQuery(initialOptions, Boolean(searchText));

  useEffect(() => {
    return () => {
      setText('');
    };
  }, []);

  useEffect(() => {
    if (searchText) {
      handleSubmit();
    }
  }, [searchText]);

  const handleSubmit = () => {
    const options = cleanObject({
      published: true,
      search: searchText,
    });
    postsRefetch(options).then(() => console.info('posts', posts));
  };

  return (
    <section className="relative mt-1">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          placeholder="Поиск по объявлениям"
          className={clsx(inputStyles(), 'w-full')}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit" hidden>
          hidden
        </button>
      </form>

      {searchText && !postsError && !postsLoading && (
        <ul className="absolute -bottom-1 z-50 grid w-full translate-y-full grid-cols-1 gap-1 rounded-lg border-2 border-inputBorder bg-white px-2 py-1">
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
}
