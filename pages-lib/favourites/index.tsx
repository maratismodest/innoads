'use client'
import Item from "@/components/Item";
import {FavouriteContext} from "@/context/FavouritesContext";
import React, {useContext} from 'react';

export default function Favorites() {
  const {favourites} = useContext(FavouriteContext)
  return (
    <div className="text-center">
      <h1>Избранное</h1>
      {favourites.length > 0 ?
        <ul className='items'>
          {favourites.map((post) => <Item post={post} key={post.slug}/>)}
        </ul> :
        <h2>Пусто</h2>
      }
    </div>
  );
};
