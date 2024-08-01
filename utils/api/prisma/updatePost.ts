'use server';
import { updatePost } from '@/prisma/services/posts';
import type { EditPostDTO } from '@/types';

export default async function updatePostPrisma(formData: EditPostDTO) {
  const reponse = await updatePost(formData);
  return reponse;
}
