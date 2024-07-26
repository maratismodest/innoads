import type { Post } from '@prisma/client';
import { Product, WithContext } from 'schema-dts';

export const getPostJsonLd = (post: Post): WithContext<Product> => ({
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