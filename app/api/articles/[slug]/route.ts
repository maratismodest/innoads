import { getArticleBySlug } from '@/prisma/services/articles';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const res = await getArticleBySlug(slug ?? '');
  return NextResponse.json(res);
}
