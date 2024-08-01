'use server';
import type { Message } from '@prisma/client';

import { getMessageByPostId } from '@/prisma/services/messages';

export default async function fetchMessage(postId: number) {
  const message = await getMessageByPostId(postId);
  return message as Message;
}
