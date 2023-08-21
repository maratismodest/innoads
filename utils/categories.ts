export type Category = 'Продам' | 'Услуги' | 'Недвижимость' | 'Куплю' | 'Даром' | 'Одежда'

export interface CategoryProps {
  value: number;
  label: Category;
}

export const categories: CategoryProps[] = [
  {value: 1, label: 'Продам',},
  {value: 3, label: 'Услуги'},
  {value: 5, label: 'Недвижимость'},
  {value: 2, label: 'Куплю'},
  {value: 7, label: 'Даром'},
  {value: 6, label: 'Одежда'}
];
