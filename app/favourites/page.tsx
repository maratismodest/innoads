'use client';

import Item from '@/components/Item';
import favouritesAtom from '@/state';
import { useAtomValue } from 'jotai';

export default function Favourites<NextPage>() {
  const favourites = useAtomValue(favouritesAtom);

  return (
    <section className="text-center">
      <h1>Избранное</h1>
      <div className="mt-4">
        {favourites.length > 0 ? (
          <ul className="items">
            {favourites.map(post => (
              <li key={post.id}>
                <Item post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <h2>Нет добавленных в избранное</h2>
        )}
      </div>
    </section>
  );
}
