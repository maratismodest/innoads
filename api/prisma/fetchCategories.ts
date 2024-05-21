import { beRoutes } from '@/api/createRequest';
import { Category } from '@prisma/client';
import axios from 'axios';

export default async function fetchCategories() {
  const { data } = await axios.get<Category[]>('/api' + beRoutes.categories);
  return data;
}
