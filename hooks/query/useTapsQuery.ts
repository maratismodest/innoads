import { useQuery } from '@tanstack/react-query';

import fetchClientTaps from '@/utils/api/client/fetchClientTaps';

export default function useTapsQuery() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['taps'],
    queryFn: fetchClientTaps,
  });

  return {
    taps: data,
    tapsLoading: isLoading,
    tapsError: error,
    tapsRefetch: refetch,
  };
}
