import fetchCategories from '@/utils/api/prisma/fetchCategories';
import { useQuery } from '@tanstack/react-query';

export default function useCategoriesQuery() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return {
    categories: data,
    categoriesLoading: isLoading,
    categoriesError: error,
    categoriesRefetch: refetch,
  };
}
