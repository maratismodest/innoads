import RedHeart from '@/public/svg/heart-red.svg';
import TransparentHeart from '@/public/svg/heart.svg';
import favouritesAtom from '@/state';
import { Post } from '@prisma/client';
import { useAtom } from 'jotai';
import React, { useCallback } from 'react';

type Props = {
  post: Post;
};
const ItemLike = ({ post }: Props) => {
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const liked = Boolean(favourites.find(x => x.id === post.id));

  const handleFavourite = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const currentList = liked ? favourites.filter(x => x.id !== post.id) : [...favourites, post];
      setFavourites(currentList);
    },
    [post.id, favourites, liked, post, setFavourites]
  );
  return (
    <button
      className="absolute right-0 top-0 z-10 cursor-pointer"
      onClick={handleFavourite}
      aria-label="Добавить в избранное"
    >
      {liked ? <RedHeart /> : <TransparentHeart />}
    </button>
  );
};

export default ItemLike;
