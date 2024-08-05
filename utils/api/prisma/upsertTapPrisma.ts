'use server';
import { Tap } from '@prisma/client';

import { createUpdateTap } from '@/prisma/services/taps';

export default async function upsertTapPrisma(formData: Tap) {
  const reponse = await createUpdateTap(formData);
  return reponse;
}
