import { useQuery } from '@tanstack/react-query';

import fetchClientPosts from '@/utils/api/client/fetchClientPosts';
import type { GetPostsParams } from '@/utils/api/prisma/fetchAds';

export default function usePostsQuery(params: Partial<GetPostsParams>, enabled = true) {
  const { data, isLoading, error, refetch, isPending, isRefetching, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchClientPosts(params),
    enabled: enabled,
  });
  return {
    posts: data,
    postsLoading: isFetching || isRefetching,
    postsError: error,
    postsRefetch: refetch,
  };
}
