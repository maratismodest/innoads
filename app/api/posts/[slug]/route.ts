import fetchAd from '@/utils/api/prisma/fetchAd';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const res = await fetchAd(slug ?? '');
  return NextResponse.json(res);
}
