import buttonStyles from '@/styles/buttonStyles';
import { routes } from '@/utils/constants';
import Link from 'next/link';
import React from 'react';

type MenuProps = {
  href: string;
  variant: 'primary' | 'secondary';
  text: string;
};

const menu: MenuProps[] = [
  {
    href: routes.profile,
    variant: 'secondary',
    text: 'Профиль',
  },
  {
    href: routes.favourites,
    variant: 'secondary',
    text: 'Избранное',
  },
  {
    href: routes.blog,
    variant: 'secondary',
    text: 'Блог',
  },
  {
    href: routes.add,
    variant: 'primary',
    text: 'Добавить объявление',
  },
];

interface HeaderButtonsProps {
  className?: string;
  onClick?: () => void;
}

export default function HeaderButtons({ className, onClick }: HeaderButtonsProps) {
  return (
    <ul className={className}>
      {menu.map(({ href, text, variant }) => (
        <li key={href} className="mb-2 lg:mb-0" data-testid={href}>
          <Link href={href} className={buttonStyles({ variant: variant })} onClick={onClick}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
