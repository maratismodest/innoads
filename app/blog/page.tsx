import Breadcrumbs, { Breadcrumb } from '@/components/Breadcrumbs';
import { getAllArticles } from '@/prisma/services/articles';
import { routes, seo } from '@/utils/constants';
import { getBlogJsonLd } from '@/utils/jsonLd';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: seo.blog.title,
  description: seo.blog.description,
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL + routes.blog,
  },
};

export default async function ArticlesPage<NextPage>() {
  const t = await getTranslations();
  const articles = await getAllArticles();

  const breadcrumbs: Breadcrumb[] = [
    { value: routes.main, label: t('Главная') },
    { value: routes.blog, label: t('Блог') },
  ];

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogJsonLd(articles)) }}
      />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1>{t('Блог')}</h1>
      <ul className="grid grid-cols-1 gap-2">
        {articles.map(({ id, title, slug }) => (
          <li key={id}>
            <Link href={routes.blog + '/' + slug}>{title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
