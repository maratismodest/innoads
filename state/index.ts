import type { Post } from '@prisma/client';
import { atomWithStorage } from 'jotai/utils';

const favourites = atomWithStorage<Post[]>('favourites', []);
export const scoreAtom = atomWithStorage<number>('score', 0);
export default favourites;
