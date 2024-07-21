import { NextResponse } from 'next/server';

import getToken from '@/utils/api/getToken';

export async function POST(request: Request) {
  const res = await request.json();
  const token = await getToken(res);

  return NextResponse.json({ token });
}
