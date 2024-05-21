import { tgLink } from '@/utils/constants';
import { dateFormat } from '@/utils/date';
import { Article, Post, User } from '@prisma/client';
import dayjs from 'dayjs';
import { Blog, BlogPosting, Person, Product, WebSite, WithContext } from 'schema-dts';

const getMainPageJsonLd = (): WithContext<WebSite> => ({
  ['@context']: 'https://schema.org',
  '@type': 'WebSite',
  name: process.env.NEXT_PUBLIC_APP_NAME,
  alternateName: `Доска объявлений города ${process.env.NEXT_PUBLIC_CITY_NAME}`,
  url: `${process.env.NEXT_PUBLIC_APP_URL}`,
});

const getPostJsonLd = (post: Post): WithContext<Product> => ({
  ['@context']: 'https://schema.org',
  '@type': 'Product',
  name: post.title,
  image: post.preview,
  description: post.body,
  offers: {
    '@type': 'Offer',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/posts/${post.slug}`,
    priceCurrency: process.env.NEXT_PUBLIC_CURRENCY,
    price: post.price,
  },
});

const getBlogPostJsonLd = (article: Article): WithContext<BlogPosting> => ({
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
  datePublished: dayjs(article.createdAt).format(dateFormat.time),
  dateModified: dayjs(article.updatedAt).format(dateFormat.time),
  inLanguage: 'ru',
});

const getBlogJsonLd = (articles: Article[]): WithContext<Blog> => ({
  ['@context']: 'https://schema.org',
  '@type': 'Blog',
});

const getPersonJsonLd = (user: User): WithContext<Person> => ({
  ['@context']: 'https://schema.org',
  '@type': 'Person',
  '@id': tgLink + '/' + user.username,
});

export { getMainPageJsonLd, getPostJsonLd, getBlogPostJsonLd, getBlogJsonLd, getPersonJsonLd };
