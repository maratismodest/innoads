import fetchBansApi from '@/utils/api/client/fetchBansApi';
import { useQuery } from '@tanstack/react-query';

export default function useBansQuery() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['bans'],
    queryFn: fetchBansApi,
  });

  return {
    bans: data,
    bansLoading: isLoading,
    bansError: error,
    bansRefetch: refetch,
  };
}
