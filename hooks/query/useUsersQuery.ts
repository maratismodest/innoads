import fetchUsers from '@/utils/api/client/fetchUsers';
import { useQuery } from '@tanstack/react-query';

export default function useUsersQuery() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return {
    users: data,
    usersLoading: isLoading,
    usersError: error,
    usersRefetch: refetch,
  };
}
