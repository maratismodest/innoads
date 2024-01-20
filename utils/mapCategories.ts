import { CategoryDTO } from '@/types';
import { Option } from '@/types/global';

export default function mapCategories(categories: CategoryDTO[]): Option[] {
  return categories.map(category => ({ value: category.id, label: category.label }));
}
