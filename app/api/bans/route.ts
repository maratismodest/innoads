import { getAllBans } from '@/prisma/services/bans';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await getAllBans();
  return NextResponse.json(res);
}
