import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import type { Breadcrumb } from '@/components/ui/Breadcrumbs';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getAllArticles, getArticleBySlug } from '@/prisma/services/articles';
import type { GetSlugPath } from '@/types';
import { routes } from '@/utils/constants';
import { dateFormat } from '@/utils/date';
import { getBlogPostJsonLd } from '@/utils/jsonLd';

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map(article => ({
    params: { slug: article.slug },
  }));
}

export async function generateMetadata({
  params: { slug },
}: GetSlugPath): Promise<Metadata | null> {
  const article = await getArticleBySlug(slug);
  if (!article) {
    return null;
  }
  // const metaDescription = article.body.slice(0, 256);

  return {
    title: article.title,
    // description: metaDescription,
    openGraph: {
      title: article.title,
      // description: metaDescription,
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${slug}`,
      siteName: process.env.NEXT_PUBLIC_APP_NAME,
      images: '/images/og-image.png',
      locale: process.env.NEXT_PUBLIC_LANGUAGE,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${slug}`,
    },
  };
}

export default async function Article<NextPage>({ params: { slug } }: GetSlugPath) {
  const t = await getTranslations();
  const article = await getArticleBySlug(slug);
  if (!article) {
    return notFound();
  }
  const { title, body, createdAt } = article;

  const breadcrumbs: Breadcrumb[] = [
    { value: routes.main, label: t('Главная') },
    { value: routes.blog, label: t('Блог') },
    { value: routes.blog + '/' + slug, label: title },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogPostJsonLd(article)) }}
      />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section>
        <h1>{title}</h1>
        <time dateTime={dayjs(createdAt).format(dateFormat.time)}>
          {dayjs(createdAt).format(dateFormat.long)}
        </time>
        <div className="wysiwyg" dangerouslySetInnerHTML={{ __html: body }} />
      </section>
    </>
  );
}
