import SearchPage from '@/components/SearchPage';
import { routes, seo } from '@/utils/constants';
import { Metadata } from 'next';
import React from 'react';

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
    <>
      <h1>Поиск</h1>
      <SearchPage />
    </>
  );
}
