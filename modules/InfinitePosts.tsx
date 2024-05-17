'use client';
import { Post } from '@prisma/client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useOnScreen from '@/hooks/useOnScreen';
import fetchPosts from '@/utils/api/prisma/fetchAds';

import Posts from '@/components/Posts';
import Spinner from '@/components/ui/Spinner';

type Props = {
  options: Record<string, number>;
  initPosts: Post[];
  initPage: number;
};

export default function InfinitePosts({ options, initPosts, initPage }: Props) {
  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);
  const [posts, setPosts] = useState<Post[]>(initPosts);
  const [page, setPage] = useState<number>(initPage);
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
        page,
        size: 20,
      });
      setPosts([...posts, ...content]);
      setPage(prev => prev + 1);
      // setHasMore(page + 1 < totalPages);
      setHasMore(content.length > 0);
    } catch (e) {
      console.log(e);
    } finally {
      setFetching(false);
    }
  }, [posts, fetching, page, hasMore, options]);

  useEffect(() => {
    if (isOnScreen && hasMore) {
      loadMore();
    }
  }, [isOnScreen, hasMore]);

  //just reset component to initial state
  useEffect(() => {
    if (Object.keys(options).length) {
      setPosts([]);
      setHasMore(true);
      setPage(initPage);
      setFetching(false);
    }
  }, [options]);

  return (
    <>
      <Posts posts={posts} />
      {fetching && <Spinner />}
      {!fetching && posts.length === 0 && !hasMore && <h2 className="text-center">Пусто</h2>}
      <div ref={elementRef} data-testid="scroll" />
    </>
  );
}
