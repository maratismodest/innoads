import { useQuery } from '@tanstack/react-query';

import fetchTap from '@/utils/api/prisma/fetchTap';

export default function useTapQuery(userId: string, enabled = true) {
  const { data, isLoading, error, refetch, isPending, isRefetching, isFetching } = useQuery({
    queryKey: ['tap'],
    queryFn: () => fetchTap(userId),
    enabled: enabled,
  });
  return {
    tap: data,
    tapLoading: isFetching || isRefetching,
    tapError: error,
    tapRefetch: refetch,
  };
}
