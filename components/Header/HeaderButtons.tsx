import React, { ReactElement } from 'react';

import BlogIcon from '@/public/svg/blog.svg';
import FavouriteIcon from '@/public/svg/favourite.svg';
import HomeIcon from '@/public/svg/home.svg';
import PlusIcon from '@/public/svg/plus.svg';
import ProfileIcon from '@/public/svg/profile.svg';
import { routes } from '@/utils/constants';

type MenuProps = {
  href: string;
  variant: 'primary' | 'secondary';
  text: string;
  logo: ReactElement;
};

export const menuHome: MenuProps = {
  href: routes.main,
  variant: 'secondary',
  text: 'Домой',
  logo: <HomeIcon className="size-6" />,
};

export const menu: MenuProps[] = [
  {
    href: routes.profile,
    variant: 'secondary',
    text: 'Профиль',
    logo: <ProfileIcon className="size-6" />,
  },
  {
    href: routes.favourites,
    variant: 'secondary',
    text: 'Избранное',
    logo: <FavouriteIcon className="size-6" />,
  },
  {
    href: routes.blog,
    variant: 'secondary',
    text: 'Блог',
    logo: <BlogIcon className="size-6" />,
  },
  {
    href: routes.add,
    variant: 'primary',
    text: 'Добавить объявление',
    logo: <PlusIcon className="size-6" />,
  },
];
