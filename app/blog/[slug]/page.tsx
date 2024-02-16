import type { GetSlugPath } from '@/types';
import fetchArticle from '@/utils/api/fetchArticle';
import fetchArticles from '@/utils/api/fetchArticles';
import { dateFormat } from '@/utils/date';
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPosting, WebSite, WithContext } from 'schema-dts';

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
  const metaDescription = article.body.slice(0, 256);

  return {
    title: article.title,
    description: metaDescription,
    openGraph: {
      title: article.title,
      description: metaDescription,
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
  const { title, body, createdAt, updatedAt } = article;

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_APP_URL}/blog/${slug}`,
    },
    headline: title,
    description: title,
    image: '',
    author: {
      '@type': 'Organization',
      name: 'InnoAds',
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'InnoAds',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_APP_URL}/icons/icon-512x512.png`,
      },
    },
    datePublished: dayjs(createdAt).format(dateFormat.time),
    dateModified: dayjs(updatedAt).format(dateFormat.time),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section>
        <h1>{title}</h1>
        <time dateTime={dayjs(createdAt).format(dateFormat.time)}>
          {dayjs(createdAt).format(dateFormat.long)}
        </time>
        <article className="wysiwyg mt-2" dangerouslySetInnerHTML={{ __html: body }} />
      </section>
    </>
  );
}
