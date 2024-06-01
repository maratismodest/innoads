import { getAllLogs } from '@/prisma/services/logs';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const res = await getAllLogs();
  return NextResponse.json(res);
}
