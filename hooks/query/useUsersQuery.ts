import { useQuery } from '@tanstack/react-query';

import fetchClientUsers from '@/utils/api/client/fetchClientUsers';
import { GetPostsParams } from '@/utils/api/prisma/fetchAds';

export default function useUsersQuery(params: Partial<GetPostsParams>) {
  const { data, isRefetching, isFetching, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchClientUsers(params),
  });

  return {
    users: data,
    usersLoading: isFetching || isRefetching,
    usersError: error,
    usersRefetch: refetch,
  };
}
