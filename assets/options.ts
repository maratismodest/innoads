type Label = "Продам" | "Одежда" | "Услуги" | "Недвижимость" | "Куплю" | "Вакансии" | "Недвижим.."

export interface OptionProps {
    value: number;
    label: Label;
}

export const options: OptionProps [] = [
    {value: 1, label: "Продам"},
    {value: 2, label: "Куплю"},
    {value: 3, label: "Услуги"},
    // {value: 4, label: "Вакансии"},
    {value: 5, label: "Недвижимость"},
    {value: 6, label: "Одежда"}
];

interface CategoryProps extends OptionProps {
    image: string
}

export const categories: CategoryProps [] = [
    {value: 1, label: "Продам", image: '/images/sell.png'},
    {value: 2, label: "Куплю", image: '/images/buy.png'},
    {value: 3, label: "Услуги", image: '/images/services.png'},
    {value: 5, label: "Недвижим..", image: '/images/estate.png'},
    {value: 6, label: "Одежда", image: '/images/clothes.png'}
];