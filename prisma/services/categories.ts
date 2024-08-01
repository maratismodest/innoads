import type { Category } from '@prisma/client';

import prisma from '@/lib/prisma';

export function getAllCategories(): Promise<Category[]> {
  return prisma.category.findMany();
}
