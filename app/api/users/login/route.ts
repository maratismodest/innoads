import getToken from '@/api/getToken';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const res = await request.json();
  const token = await getToken(res);

  return NextResponse.json({ token });
}
