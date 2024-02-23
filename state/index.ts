import { PostDTO } from '@/types';
import { atomWithStorage } from 'jotai/utils';

const favourites = atomWithStorage<PostDTO[]>('favourites', []);
export default favourites;
