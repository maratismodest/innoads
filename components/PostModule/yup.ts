import { array, boolean, InferType, number, object, string } from 'yup';

const required = 'Поле обязательно для заполнения';
const positive = 'Цена должна быть больше 0';
const too_short = 'Слишком короткое';
const too_long = 'Слишком длинное';
const required_image = 'Добавить хотя бы одно фото!';
const too_many_images = 'Не больше 4 фотографий!';
const text_normalized = 'Запрещены: ?, !, emoji';

const regex = /^(?!.*[!?])[a-zA-Z0-9\s\u0400-\u04FF\u0020-\u007E]+$/;

export const schema = object({
  categoryId: number().required(required).integer().typeError(required),
  price: number().required(required).positive(positive).integer().typeError(required),
  title: string()
    .required(required)
    .min(4, too_short)
    .max(100, too_long)
    .matches(regex, text_normalized),
  body: string().required(required).min(10, too_short).max(800, too_long),
  agreement: boolean().oneOf([true], required),
  images: array()
    .of(string())
    .min(1, required_image)
    .max(4, too_many_images)
    .required(required_image),
  post: boolean(),
});

export const defaultValues = {
  categoryId: undefined,
  price: undefined,
  title: undefined,
  body: undefined,
  images: [],
  agreement: true,
  post: true,
};

export type IFormInput = InferType<typeof schema>;
