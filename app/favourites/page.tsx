'use client'

import Item from '@/components/Item';
import {FavouriteContext} from '@/context/FavouritesContext';
import type {Seo} from '@/types';
import React, {useContext} from 'react';

type Props = {
  seo: Seo
}

export default function Favourites<NextPage>(
  // { seo }: Props
) {
  const {favourites} = useContext(FavouriteContext);

  return (
    // <Layout {...seo} className='text-center'>
    <div className='text-center'>
      <h1>Избранное</h1>
      {favourites.length > 0 ?
        <ul className='items'>
          {favourites.map((post) => <Item post={post} key={post.slug}/>)}
        </ul> :
        <h2>Нет добавленных в избранное</h2>
      }
    </div>

    // </Layout>
  );
}

