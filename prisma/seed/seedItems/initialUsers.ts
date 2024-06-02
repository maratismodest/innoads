import { Prisma } from '@prisma/client';
import UserUncheckedCreateInput = Prisma.UserUncheckedCreateInput;

export const initialUsers: UserUncheckedCreateInput[] = [
  {
    id: '71233480',
    username: 'maratfaizer',
    // createdAt: new Date('2024-05-17T10:56:53.893Z'),
    // updatedAt: new Date('2024-05-17T10:56:53.893Z'),
    role: 'ADMIN',
  },
];
