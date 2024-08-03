'use client';

import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import Posts from '@/components/Posts';
import favouritesAtom from '@/state';

export default function FavouritesPage<NextPage>() {
  const t = useTranslations();
  const favourites = useAtomValue(favouritesAtom);

  return (
    <section>
      <h1>{t('Избранное')}</h1>
      <Posts posts={favourites} className="mt-4" />
    </section>
  );
}
