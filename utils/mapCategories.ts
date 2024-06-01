import { Option } from '@/types/global';
import { Category } from '@prisma/client';

export default function mapCategories(categories: Category[]): Option[] {
  return categories.map(category => ({ value: category.id, label: category.label }));
}
