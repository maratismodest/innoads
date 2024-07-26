import { WebSite, WithContext } from 'schema-dts';

export const getMainPageJsonLd = (): WithContext<WebSite> => ({
  ['@context']: 'https://schema.org',
  '@type': 'WebSite',
  name: process.env.NEXT_PUBLIC_APP_NAME,
  alternateName: `Доска объявлений города ${process.env.NEXT_PUBLIC_CITY_NAME}`,
  url: `${process.env.NEXT_PUBLIC_APP_URL}`,
});

