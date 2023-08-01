import Item from '@/components/Item';
import Layout from '@/components/Layout';
import { FavouriteContext } from '@/context/FavouritesContext';
import type { Seo } from '@/types';
import { seo, revalidate } from '@/utils/constants';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next/types';
import React, { useContext } from 'react';

type Props = {
  seo: Seo
}

export default function Favourites<NextPage>({ seo }: Props) {
  const { t } = useTranslation();
  const { favourites } = useContext(FavouriteContext);

  return (
    <Layout {...seo} className='text-center'>
      <h1>{t('favourite')}</h1>
      {favourites.length > 0 ?
        <ul className='items'>
          {favourites.map((post) => <Item post={post} key={post.slug} />)}
        </ul> :
        <h2>{t('noFavourites')}</h2>
      }
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      seo: seo.favourites,
      ...(await serverSideTranslations(locale as string))
    },
    revalidate: revalidate
  };
};
