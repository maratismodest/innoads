import { Post } from '@prisma/client';
import { atomWithStorage } from 'jotai/utils';

const favourites = atomWithStorage<Post[]>('favourites', []);
export const stateAtom = atomWithStorage<0 | 1>('telegram', 0);
export default favourites;
