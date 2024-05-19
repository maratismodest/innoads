import { getAllUsers } from '@/prisma/services/users';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await getAllUsers();
  return NextResponse.json(res);
}
