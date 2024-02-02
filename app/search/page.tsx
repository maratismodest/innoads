import SearchPage from '@/components/SearchPage';
import Spinner from '@/components/ui/Spinner';
import { routes, seo } from '@/utils/constants';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: seo.search.title,
  description: seo.search.description,
  openGraph: {
    // type: 'website',
    url: process.env.NEXT_PUBLIC_APP_URL + routes.search,
    title: seo.search.title,
    description: seo.search.description,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL + routes.search,
  },

};

export default function Search() {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchPage />
    </Suspense>
  );
}
