export type PostFormValues = {
  title: string,
  body: string,
  price: number | string,
  categoryId: number
}

export const postDefaultValues: PostFormValues = {
  categoryId: 0,
  title: '',
  price: '',
  body: ''
};

export const messages = {
  forbiddenWords: 'Есть запрещенные слова!',
  postUpdated: 'Ваше объявление изменено!',
  somethingWentWrong: 'Что-то пошло не так!'
};
