import { getAllUsers } from '@/prisma/services/users';
import { User } from '@prisma/client';
import { NextResponse } from 'next/server';

const prepareUser = (user: User) =>
  JSON.stringify(user, (_key, value) => {
    typeof value === 'bigint' ? (value = value.toString()) : value;
  });

export async function GET() {
  const res = await getAllUsers();
  const preparedUsers = res.map(user => prepareUser(user));

  return NextResponse.json(preparedUsers);
}
