'use client';
import type { Post } from '@prisma/client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Posts from '@/components/Posts';
import Spinner from '@/components/ui/Spinner';
import useOnScreen from '@/hooks/useOnScreen';
import fetchPosts from '@/utils/api/prisma/fetchAds';

import { InitOptions } from './InfinitePosts.types';

type Props = {
  initOptions: InitOptions;
  initPosts: Post[];
  // initPage: number;
};

export function InfinitePosts({
  initOptions,
  initPosts,
  // initPage
}: Props) {
  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);
  const [posts, setPosts] = useState<Post[]>(initPosts);
  const [options, setOptions] = useState<InitOptions>(initOptions);

  const [hasMore, setHasMore] = useState(true);
  const [fetching, setFetching] = useState(false);

  const loadMore = useCallback(async () => {
    if (fetching) {
      return;
    }
    setFetching(true);
    try {
      const content = await fetchPosts({
        ...options,
      });
      setPosts([...posts, ...content]);
      setOptions(prev => ({ ...prev, page: prev.page + 1 }));
      // setHasMore(page + 1 < totalPages);
      setHasMore(content.length > 0);
    } catch (e) {
      console.log(e);
    } finally {
      setFetching(false);
    }
  }, [posts, fetching, hasMore, options]);

  useEffect(() => {
    if (isOnScreen && hasMore) {
      loadMore();
    }
  }, [isOnScreen, hasMore, options.categoryId, options.search, options.page]);

  // just reset component to initial state
  useEffect(() => {
    if (Object.keys(options).length) {
      setPosts(initPosts);
      setHasMore(true);
      setOptions(initOptions);
      setFetching(false);
    }
  }, [initOptions]);

  return (
    <>
      <Posts posts={posts} />
      {fetching && <Spinner />}
      {/*{!fetching && posts.length === 0 && !hasMore && <h2 className="text-center">Пусто</h2>}*/}
      <div ref={elementRef} data-testid="scroll" />
    </>
  );
}
