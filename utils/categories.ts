type Category = 'sell' | 'services' | 'estate' | 'buy' | 'free' | 'clothes'

export interface CategoryProps {
  value: number;
  label: Category;
}

export const categories: CategoryProps[] = [
  {value: 1, label: 'sell'},
  {value: 3, label: 'services'},
  {value: 5, label: 'estate'},
  {value: 2, label: 'buy'},
  {value: 7, label: 'free'},
  {value: 6, label: 'clothes'},
]
