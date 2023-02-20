export type PostFormValues = {
    title: string,
    body: string,
    price: number,
    categoryId: number
}

export const postDefaultValues: PostFormValues = {
    categoryId: 1,
    title: '',
    price: 0,
    body: '',
}

export const messages = {
    forbiddenWords: 'Есть запрещенные слова!',
    postUpdated: 'Ваше объявление изменено!',
    somethingWentWrong: 'Что-то пошло не так!',
}
