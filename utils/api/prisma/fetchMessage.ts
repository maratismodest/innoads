'use server';
import { getMessageByPostId } from '@/prisma/services/messages';
import { Message } from '@prisma/client';

export default async function fetchMessage(postId: number) {
  const message = await getMessageByPostId(postId);
  return message as Message;
}
