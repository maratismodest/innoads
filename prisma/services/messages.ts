import prisma from '@/lib/prisma';
import { Message } from '@prisma/client';

export function getAllMessage() {
  return prisma.message.findMany();
}

export function getMessageByPostId(postId: number) {
  const message = prisma.message.findFirst({ where: { postId } });
  return message;
}

export function createMessage(formData: Message) {
  return prisma.message.create({
    data: formData,
  });
}
