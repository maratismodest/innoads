import { CategoryDTO } from '@/types';

import client, { beRoutes } from './createRequest';

export type FetchCategories = CategoryDTO[];

export default async function fetchCategories() {
  const { data } = await client.get<FetchCategories>(beRoutes.categories);
  return data;
}
