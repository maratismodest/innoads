import fetchApiPost from '@/utils/api/client/fetchApiPost';
import { useQuery } from '@tanstack/react-query';

export default function usePostQuery(slug: string, enabled = true) {
  const { data, isLoading, error, refetch, isPending, isRefetching, isFetching } = useQuery({
    queryKey: ['post'],
    queryFn: () => fetchApiPost(slug),
    enabled: enabled,
  });
  return {
    post: data,
    postLoading: isFetching || isRefetching,
    postError: error,
    postRefetch: refetch,
  };
}
