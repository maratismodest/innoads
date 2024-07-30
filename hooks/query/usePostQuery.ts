import { useQuery } from '@tanstack/react-query';

import fetchClientPost from '@/utils/api/client/fetchClientPost';

export default function usePostQuery(slug: string, enabled = true) {
  const { data, isLoading, error, refetch, isPending, isRefetching, isFetching } = useQuery({
    queryKey: ['post'],
    queryFn: () => fetchClientPost(slug),
    enabled: enabled,
  });
  return {
    post: data,
    postLoading: isFetching || isRefetching,
    postError: error,
    postRefetch: refetch,
  };
}
