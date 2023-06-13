import { ArticleDTO } from '@/types';

import client, { beRoutes } from './createRequest';

const fetchArticles = async (): Promise<ArticleDTO[]> => {
  const { data } = await client.get<ArticleDTO[]>(beRoutes.articles);
  return data;
};
export default fetchArticles;
