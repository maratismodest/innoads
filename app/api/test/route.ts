import { getAllPosts } from '@/prisma/services/posts';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const res = await getAllPosts();
  return NextResponse.json(res);
}
