'use client';

import Posts from '@/components/Posts';
import withAuth from '@/hoc/withAuth';
import favouritesAtom from '@/state';
import { useAtomValue } from 'jotai';

function FavouritesPage<NextPage>() {
  const favourites = useAtomValue(favouritesAtom);

  return (
    <section className="text-center">
      <h1>Избранное</h1>
      <div className="mt-4">
        {favourites.length > 0 ? (
          <Posts posts={favourites} />
        ) : (
          <h2>Нет добавленных в избранное</h2>
        )}
      </div>
    </section>
  );
}

export default withAuth(FavouritesPage);
