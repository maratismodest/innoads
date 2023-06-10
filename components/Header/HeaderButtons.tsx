import buttonStyles from "@/styles/buttonStyles";
import {routes} from "@/utils/constants";
import Link from "next/link";
import React from "react";

type MenuProps = {
  href: string,
  variant: 'primary' | 'secondary',
  text: string,
  label: string
}

const menu: MenuProps[] = [
  {
    href: routes.profile,
    variant: 'secondary',
    text: 'profile',
    label: 'Профиль'
  },
  {
    href: routes.favourites,
    variant: 'secondary',
    text: 'favourite',
    label: 'Избранное'
  },
  {
    href: routes.blog,
    variant: 'secondary',
    text: 'blog',
    label: 'Блог'
  },
  {
    href: routes.add,
    variant: 'primary',
    text: 'addAd',
    label: 'Добавить объявление'
  },
]

export default function HeaderButtons({className}: { className?: string }) {

  return (
    <ul className={className}>
      {menu.map(({href, text, variant, label}) =>
        <li key={href} className='mb-2 lg:mb-0' data-testid={href}>
          <Link href={href} className={buttonStyles({variant: variant})}>
            {label}
          </Link>
        </li>)
      }
    </ul>
  )
}
