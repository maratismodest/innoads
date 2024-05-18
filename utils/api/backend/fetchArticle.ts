import { ArticleDTO } from '@/types';

import client, { beRoutes } from '../createRequest';

export default async function fetchArticle(slug: string): Promise<ArticleDTO> {
  const { data } = await client.get<ArticleDTO>(beRoutes.articles + '/' + slug);
  return data;
}
