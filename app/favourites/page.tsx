'use client';

import Posts from '@/components/Posts';
import withAuth from '@/hoc/withAuth';
import favouritesAtom from '@/state';
import { useAtomValue } from 'jotai';
import useTranslation from 'next-translate/useTranslation';

function FavouritesPage<NextPage>() {
  const { t } = useTranslation('common');
  const favourites = useAtomValue(favouritesAtom);

  return (
    <section className="text-center">
      <h1>{t('Избранное')}</h1>
      <Posts posts={favourites} className="mt-4" />
    </section>
  );
}

export default withAuth(FavouritesPage);
