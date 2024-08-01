import type { Article } from '@prisma/client';
import axios from 'axios';

import { beRoutes } from '@/utils/api/createRequest';

export default async function fetchArticles() {
  const { data } = await axios.get<Article[]>('/api' + beRoutes.articles);
  return data;
}
