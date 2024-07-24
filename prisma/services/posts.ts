import prisma from '@/lib/prisma';
import type { CreatePostDTO, EditPostDTO } from '@/types';

export function getAllPosts() {
  return prisma.post.findMany();
}

export function createPost(formData: CreatePostDTO) {
  return prisma.post.create({
    data: formData,
  });
}

export function updatePost(formData: Partial<EditPostDTO>) {
  return prisma.post.update({
    where: {
      id: formData.id,
    },
    data: formData,
  });
}
