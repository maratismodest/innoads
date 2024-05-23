import { Post } from '@prisma/client';
import { atomWithStorage } from 'jotai/utils';

const favourites = atomWithStorage<Post[]>('favourites', []);
export default favourites;
