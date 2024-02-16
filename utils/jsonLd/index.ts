import { PostDTO } from '@/types';
import { Product, WithContext } from 'schema-dts';

const getPostJsonLd = (post: PostDTO): WithContext<Product> => ({
  ['@context']: 'https://schema.org',
  '@type': 'Product',
  name: post.title,
  image: post.preview,
  description: post.body,
  offers: {
    '@type': 'Offer',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/posts/${post.slug}`,
    priceCurrency: 'RUB',
    price: post.price,
  },
});

export { getPostJsonLd };
