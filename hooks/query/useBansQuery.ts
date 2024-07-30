import { useQuery } from '@tanstack/react-query';

import fetchClientBans from '@/utils/api/client/fetchClientBans';

export default function useBansQuery() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['bans'],
    queryFn: fetchClientBans,
  });

  return {
    bans: data,
    bansLoading: isLoading,
    bansError: error,
    bansRefetch: refetch,
  };
}
