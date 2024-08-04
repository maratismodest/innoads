import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import InfinitePosts, { InitOptions } from '@/components/InfinitePosts';
import HomePageCategories from '@/pages-lib/homepage';
import SearchModule from '@/pages-lib/homepage/SearchModule';
import fetchPosts from '@/utils/api/prisma/fetchAds';
import { seo } from '@/utils/constants';
import { getMainPageJsonLd } from '@/utils/jsonLd';

export const metadata: Metadata = {
  title: seo.default.title,
  description: seo.default.description,
  authors: [{ name: process.env.NEXT_PUBLIC_APP_NAME }],
  publisher: process.env.NEXT_PUBLIC_APP_NAME,
  manifest: '/manifest.json',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  openGraph: {
    type: 'website',
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: ['/images/og-image.png'],
    title: seo.default.title,
    description: seo.default.description,
    locale: process.env.NEXT_PUBLIC_LANGUAGE,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },
};

export const revalidate = 3600;

const initOptions: InitOptions = { size: 20, published: true, page: 0 };

export default async function Home<NextPage>() {
  const t = await getTranslations();
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
