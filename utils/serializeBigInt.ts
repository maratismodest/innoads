import { Ban, User } from '@prisma/client';

const serializeBigInt = (item: User[] | Ban[]) =>
  JSON.stringify(
    item,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
  );

export default serializeBigInt;
