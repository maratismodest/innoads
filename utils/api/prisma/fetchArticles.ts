import { beRoutes } from '@/utils/api/createRequest';
import { Article } from '@prisma/client';
import axios from 'axios';

export default async function fetchArticles() {
  const { data } = await axios.get<Article[]>('/api' + beRoutes.articles);
  return data;
}
