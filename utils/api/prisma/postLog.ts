'use server';
import { createLog } from '@/prisma/services/logs';

export default async function postLog(message: string) {
  const user = await createLog(message);
  return user;
}
