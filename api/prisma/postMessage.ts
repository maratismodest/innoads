'use server';
import { createMessage } from '@/prisma/services/messages';
import { Message } from '@prisma/client';

export default async function postMessage(formData: Message) {
  const message = await createMessage(formData);
  return message;
}
