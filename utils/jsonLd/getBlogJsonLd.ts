import type { Article } from '@prisma/client';
import { Blog, WithContext } from 'schema-dts';

export const getBlogJsonLd = (articles: Article[]): WithContext<Blog> => ({
  ['@context']: 'https://schema.org',
  '@type': 'Blog',
});