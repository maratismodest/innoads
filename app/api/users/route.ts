import { getAllUsers } from '@/prisma/services/users';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await getAllUsers();
  const updatedData = res.map(x =>
    JSON.stringify(res, (_key, value) => {
      typeof value === 'bigint' ? (value = value.toString()) : value;
    })
  );

  return NextResponse.json(updatedData);
}
