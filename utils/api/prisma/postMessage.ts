'use server';
import type { Message } from '@prisma/client';

import { createMessage } from '@/prisma/services/messages';

export default async function postMessage(formData: Message) {
  const message = await createMessage(formData);
  return message;
}
