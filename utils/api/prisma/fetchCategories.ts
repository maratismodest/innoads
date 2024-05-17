import { beRoutes, clientPrisma } from '@/utils/api/createRequest';
import { Category } from '@prisma/client';

export default async function fetchCategories() {
  const { data } = await clientPrisma.get<Category[]>(beRoutes.categories);
  return data;
}
