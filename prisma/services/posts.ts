import prisma from '@/lib/prisma';
import { CreatePostDTO } from '@/types';

export function getAllPosts() {
  return prisma.post.findMany();
}

export function createPost(formData: CreatePostDTO) {
  return prisma.post.create({
    data: formData,
  });
}
