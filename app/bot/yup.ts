import { array, boolean, InferType, number, object, string } from 'yup';

const required = 'Поле обязательно для заполнения';
const positive = 'Цена должна быть больше 0';
const too_short = 'Слишком короткое';
const too_long = 'Слишком длинное';
const required_image = 'Добавить хотя бы одно фото!';

export const schema = object({
  categoryId: number().required(required).integer().typeError(required),
  price: number().required(required).positive(positive).integer().typeError(required),
  title: string().required(required).min(10, too_short).max(100, too_long),
  body: string().required(required).min(10, too_short).max(800, too_long),
  agreement: boolean().oneOf([true], required),
  images: array().min(1, required_image).max(4, 'Не больше 4 фотографий!').required(required_image),
  post: boolean(),
});

export type IFormInput = InferType<typeof schema>;
