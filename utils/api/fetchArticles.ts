import { ArticleDTO } from '@/types';

import client, { beRoutes } from './createRequest';

export default async function fetchArticles(): Promise<ArticleDTO[]> {
  const { data } = await client.get<ArticleDTO[]>(beRoutes.articles);
  return data;
};
