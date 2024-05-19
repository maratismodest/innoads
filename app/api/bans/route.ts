import { getAllBans } from '@/prisma/services/bans';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  const res = await getAllBans();
  return NextResponse.json(res);
}
