type Label = "Продам" | "Куплю" | "Услуги" | "Вакансии"

export interface OptionProps {
    value: number;
    label: Label;
}

export const options: OptionProps [] = [
    {value: 1, label: "Продам"},
    {value: 2, label: "Куплю"},
    {value: 3, label: "Услуги"},
    {value: 4, label: "Вакансии"},
];
