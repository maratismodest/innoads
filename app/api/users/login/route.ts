import getToken from '@/utils/api/getToken';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const res = await request.json();
  console.log('res', res);
  const token = await getToken(res);

  return NextResponse.json({ token });
}
