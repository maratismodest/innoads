import { NextResponse } from 'next/server';

import fetchTap from '@/utils/api/prisma/fetchTap';

export const dynamic = 'force-dynamic';
export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const userId = params.userId;
  const res = await fetchTap(userId ?? '');
  return NextResponse.json(res);
}
