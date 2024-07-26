import type { Article } from '@prisma/client';
import { BlogPosting, WithContext } from 'schema-dts';
import dayjs from 'dayjs';
import { dateFormat } from '@/utils/date';

export const getBlogPostJsonLd = (article: Article): WithContext<BlogPosting> => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${process.env.NEXT_PUBLIC_APP_URL}/blog/${article.slug}`,
  },
  headline: article.title,
  description: article.title,
  image: '',
  author: {
    '@type': 'Organization',
    name: process.env.NEXT_PUBLIC_APP_NAME,
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
  publisher: {
    '@type': 'Organization',
    name: process.env.NEXT_PUBLIC_APP_NAME,
    logo: {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/icons/icon-512x512.png`,
    },
  },
  datePublished: dayjs(article.createdAt).format(dateFormat.time),
  dateModified: dayjs(article.updatedAt).format(dateFormat.time),
  inLanguage: process.env.NEXT_PUBLIC_LANGUAGE,
});