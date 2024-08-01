import type { Category } from '@prisma/client';
import axios from 'axios';

import { beRoutes } from '@/utils/api/createRequest';

export default async function fetchCategories() {
  const { data } = await axios.get<Category[]>('/api' + beRoutes.categories);
  return data;
}
