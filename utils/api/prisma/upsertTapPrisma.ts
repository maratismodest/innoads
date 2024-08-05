'use server';
import { Tap } from '@prisma/client';

import { createUpdateTap } from '@/prisma/services/taps';
import { CreateTap } from '@/types';

export default async function upsertTapPrisma(formData: Tap | CreateTap) {
  const reponse = await createUpdateTap(formData);
  return reponse;
}
