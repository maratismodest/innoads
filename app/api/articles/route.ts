import { getAllArticles } from '@/prisma/services/articles';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await getAllArticles();
  return NextResponse.json(res);
}
