import { GetSlugPath } from '@/types';
import fetchArticle from '@/utils/api/fetchArticle';
import fetchArticles from '@/utils/api/fetchArticles';
import { dateFormat } from '@/utils/date';
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

export async function generateStaticParams() {
  const articles = await fetchArticles();

  return articles.map(article => ({
    params: { slug: article.slug },
  }));
}

export async function generateMetadata({
                                         params: { slug },
                                       }: GetSlugPath): Promise<Metadata | null> {
  const article = await fetchArticle(slug);
  if (!article) {
    return null;
  }
  const description = article.body.slice(0, 256);
  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${slug}`,
      siteName: process.env.NEXT_PUBLIC_APP_NAME,
      images: '/images/og-image.png',
      locale: 'ru',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${slug}`,
    },
  };
}

export default async function Article<NextPage>({ params: { slug } }: GetSlugPath) {
  const article = await fetchArticle(slug);
  if (!article) {
    return notFound();
  }
  const { title, body, createdAt } = article;
  return (
    <div itemScope itemType='https://schema.org/Article'>
      <h1>{title}</h1>
      <time dateTime={dayjs(createdAt).format(dateFormat.time)}>
        {dayjs(createdAt).format(dateFormat.long)}
      </time>
      <article
        itemProp='articleBody'
        className='wysiwyg mt-2'
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
}
