import type { Seo } from '@/types';

export const routes = {
  add: '/add',
  profile: '/profile',
  main: '/',
  search: '/search',
  edit: '/edit',
  post: '/post',
  favourites: '/favourites',
  blog: '/blog',
  articles: '/articles',
  users: '/users',
  bot: '/bot',
} as const;

export const seo: Record<string, Seo> = {
  default: {
    title: 'Доска объявлений города Иннополис',
    description:
      'Здесь вы можете найти объяления о продаже и покупке товаров и об услугах города Иннополис. Бесплатно подать объявление.',
  },
  profile: {
    title: 'Личный кабинет',
    description:
      'Здесь вы можете подать объявление, редактировать и удалять уже существующие объявления',
  },
  add: {
    title: 'Добавить объявление',
    description: 'Самый простой способ подать объявление: укажите категорию, цену, фото и описание',
  },
  edit: {
    title: 'Редактировать объявление',
    description: 'В этой форме вы можете легко отредактировать уже существующее объявление',
  },
  auth: {
    title: 'На страницу авторизации',
    description:
      'Вам нужно авторизоваться, прежде чем попасть в личный кабинет или подать объявление',
  },
  blog: {
    title: 'Блог доски объявлений InnoAds',
    description:
      'В этом разделе публикуется важная информация, статьи, новости и другие информационные материалы',
  },
  favourites: {
    title: 'Избранное',
    description: 'Страница с объявлениями, которые вам понравились',
  },
  search: {
    title: `Поиск в ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: `Ищите объявления города ${process.env.NEXT_PUBLIC_APP_NAME} в бесплатной доске ${process.env.NEXT_PUBLIC_APP_NAME}`,
  },
  notFound: {
    title: 'Страница не найдена',
    description: 'Перейдите на главную страницу или в личный кабинет',
  },
} as const;

export const tgLink = 'https://t.me';

export const NO_IMAGE =
  'data:image/jpeg;base64,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';
