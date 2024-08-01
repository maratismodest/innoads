import type { Category } from '@prisma/client';

import type { Option } from '@/types';

export default function mapCategories(categories: Category[]): Option[] {
  return categories.map(({ id, label }) => ({ value: id, label: label }));
}
