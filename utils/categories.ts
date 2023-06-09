type Category = 'sell' | 'services' | 'estate' | 'buy' | 'free' | 'clothes'

export interface CategoryProps {
  value: number;
  label: Category;
  ru: string
}

export const categories: CategoryProps[] = [
  {value: 1, label: 'sell', ru: 'Продать'},
  {value: 3, label: 'services', ru: 'Услуги'},
  {value: 5, label: 'estate', ru: 'Недвижимость'},
  {value: 2, label: 'buy', ru: 'Куплю'},
  {value: 7, label: 'free', ru: 'Даром'},
  {value: 6, label: 'clothes', ru: 'Одежда'},
]
