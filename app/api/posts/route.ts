import fetchPosts from '@/utils/api/prisma/fetchAds';
import { NextResponse } from 'next/server';

export function cleanObject(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null && value !== 0 && value !== '')
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, any>
    );
}

export async function GET(req: Request, res: NextResponse) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const size = Number(searchParams.get('size'));
  const page = Number(searchParams.get('page'));
  const userId = searchParams.get('userId');
  const categoryId = Number(searchParams.get('categoryId'));
  const _published = searchParams.get('published');
  const published = _published ? Boolean(_published) : null;
  const response = await fetchPosts(cleanObject({ size, page, categoryId, userId, published }));
  return NextResponse.json(response);
}
