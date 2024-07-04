import { getAllUsers } from '@/prisma/services/users';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET() {
  const res = await getAllUsers();

  return NextResponse.json(res);
}
