import prisma from '@/lib/prisma';

export function getAllCategories() {
  return prisma.category.findMany();
}
