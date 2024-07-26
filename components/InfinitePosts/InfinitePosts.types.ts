import { GetPostsParams } from '@/utils/api/prisma/fetchAds';

export type InitOptions = Partial<GetPostsParams> & Required<{ page: number }>;
