export const routes = {
    add: '/add',
    profile: '/profile',
    main: '/',
    search: '/search',
    edit: '/edit',
    post: '/post'
}

export const titles = {
    profile: "Личный кабинет",
    add: "Добавить объявление",
    edit: "Редактировать объявление",
    auth: "На страницу авторизации",
    blog: "Блог"
}

export const tgLink = 'https://t.me'

export const NO_IMAGE = '/images/no-image.jpeg'

export const SEO_TITLE = 'Доска объявлений города Иннополис';
export const SEO_DESCRIPTION = 'Доска объявлений – объявления города Иннополис о продаже и покупке товаров всех категорий. Самый простой способ продать или купить вещи.'
export const SEO_IMAGE = '/icons/icon-192x192.png'
export const ACCEPTED_IMAGE_FORMAT = ".jpg, .jpeg, .png"

export type InputType = 'category' | 'price' | 'title' | 'body'

export interface ErrorProps {
    name: InputType
}

export const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 300,
    },
    overlay: {zIndex: 2}
};
