import { Ban, User } from '@prisma/client';

export default function serializeBigInt(item: User[] | Ban[]) {
  return JSON.stringify(
    item,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
  );
}
