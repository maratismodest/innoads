import { PostDTO } from '@/types';
import { Post } from '@prisma/client';
import { atomWithStorage } from 'jotai/utils';

const favourites = atomWithStorage<PostDTO[] | Post[]>('favourites', []);
export default favourites;
