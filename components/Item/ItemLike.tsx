import { Post } from '@prisma/client';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import React, { ComponentPropsWithoutRef, useCallback } from 'react';

import TransparentHeart from '@/public/svg/heart.svg';
import RedHeart from '@/public/svg/heart-red.svg';
import favouritesAtom from '@/state';

type Props = ComponentPropsWithoutRef<'button'> & {
  post: Post;
};

const ItemLike = ({ post, className }: Props) => {
  const t = useTranslations();
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const liked = Boolean(favourites.find(x => x.id === post.id));

  const handleFavourite = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const currentList = liked ? favourites.filter(x => x.id !== post.id) : [...favourites, post];
      setFavourites(currentList);
    },
    [favourites, liked, post, setFavourites]
  );
  return (
    <button
      className={clsx('z-10 cursor-pointer', className)}
      aria-label={t('Добавить в избранное')}
      onClick={handleFavourite}
    >
      {liked ? <RedHeart /> : <TransparentHeart />}
    </button>
  );
};

export default ItemLike;
