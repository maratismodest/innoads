import { getAllMessage } from '@/prisma/services/messages';
import { Message } from '@prisma/client';
import { NextResponse } from 'next/server';

const headers = {
  'Cache-Control': 's-maxage=600, stale-while-revalidate=300',
};

export async function GET() {
  const res: Message[] = await getAllMessage();
  return NextResponse.json(res, {
    headers: headers,
  });
}
