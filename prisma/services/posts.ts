import prisma from '@/lib/prisma';

export function getAllPosts() {
  return prisma.post.findMany();
}
