import InfinitePosts, { InitOptions } from '@/modules/InfinitePosts';
import SearchModule from '@/modules/SearchModule/SearchModule';
import HomePageCategories from '@/pages-lib/homepage';
import fetchPosts from '@/utils/api/prisma/fetchAds';
import { getMainPageJsonLd } from '@/utils/jsonLd';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const revalidate = 3600;

const initOptions: InitOptions = { size: 20, published: true, page: 0 };

export default async function Home<NextPage>() {
  const { t, lang } = useTranslation('common');

  const initPosts = await fetchPosts(initOptions);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getMainPageJsonLd()) }}
      />
      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-[auto_1fr]">
        <HomePageCategories />
        <SearchModule />
      </div>
      <div className="flex justify-between align-baseline">
        <h1>{t('Последние объявления')}</h1>
        {/*<span>{totalPages * 20} объявлений</span>*/}
      </div>
      <InfinitePosts
        initPosts={initPosts}
        initOptions={{ ...initOptions, page: initOptions.page + 1 }}
      />
    </>
  );
}
