import { getAllCategories } from '@/prisma/services/categories';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const res = await getAllCategories();
  return NextResponse.json(res);
}
