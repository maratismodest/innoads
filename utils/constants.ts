export const titles = {
    profile: 'Личный кабинет',
    add: 'Добавить объявление',
    edit: 'Редактировать объявление',
    auth: 'На страницу авторизации',
    blog: 'Блог',
    favourites: 'Избранное',
}

export const descriptions = {
    profile: 'Личный кабинет',
    add: 'Добавить объявление',
    edit: 'Редактировать объявление',
    auth: 'На страницу авторизации',
    blog: 'Блог',
    favourites: 'Страница с объяалениями, которые вам понравилисб',
}

export const tgLink = 'https://t.me'

export const NO_IMAGE = '/images/no-image.jpeg'

export const SEO_TITLE = 'Доска объявлений города Иннополис'
export const SEO_DESCRIPTION =
    'Доска объявлений – объявления города Иннополис о продаже и покупке товаров всех категорий. Самый простой способ продать или купить вещи.'
export const SEO_IMAGE = '/icons/icon-192x192.png'
export const ACCEPTED_IMAGE_FORMAT = '.jpg, .jpeg, .png'

export type FormValues = {
    title: string,
    body: string,
    price: number | null,
    categoryId: number
}

export const defaultValues = {
    categoryId: 1,
    title: '',
    price: null,
    body: '',
}

export const messages = {
    forbiddenWords: 'Есть запрещенные слова!',
    noImages: 'Добавить хотя бы одно фото!',
    manyImages: 'Не больше 4 фотографий!',
    postUpdated: 'Ваше объявление изменено!',
    somethingWentWrong: "Что-то пошло не так!"
}
