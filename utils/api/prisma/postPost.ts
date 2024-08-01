'use server';
import { createPost } from '@/prisma/services/posts';
import type { CreatePostDTO } from '@/types';

export default async function postAd(formData: CreatePostDTO) {
  const user = await createPost(formData);
  return user;
}
