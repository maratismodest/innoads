'use client';

import Posts from '@/components/Posts';
import favouritesAtom from '@/state';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

function FavouritesPage<NextPage>() {
  const t = useTranslations();
  const favourites = useAtomValue(favouritesAtom);

  return (
    <section className="text-center">
      <h1>{t('Избранное')}</h1>
      <Posts posts={favourites} className="mt-4" />
    </section>
  );
}

export default FavouritesPage;
