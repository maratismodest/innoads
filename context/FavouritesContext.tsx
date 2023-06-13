import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { PostDTO } from '@/types';

type favouritesContextType = {
  favourites: PostDTO[];
  setFavourites: Dispatch<SetStateAction<PostDTO[]>>
};

const favouritesContextDefaultValues: favouritesContextType = {
  favourites: [],
  setFavourites: () => {
  }
};
export const FavouriteContext = createContext<favouritesContextType>(favouritesContextDefaultValues);

type Props = {
  children: ReactNode;
};

export default function FavouriteProvider({ children }: Props) {
  const [favourites, setFavourites] = useState<PostDTO[]>([]);

  useEffect(() => {
    const posts = localStorage.getItem('favourites');
    if (posts) {
      setFavourites(JSON.parse(posts));
    } else {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }, []);

  const value = {
    favourites, setFavourites
  };

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
}
