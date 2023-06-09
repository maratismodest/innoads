'use client'
import Dropdown from '@/components/Dropdown'
import Button from '@/components/ui/Button'
import useOnClickOutsideRef from '@/hooks/useOnClickOutsideRef'
import buttonStyles from "@/styles/buttonStyles";
import {routes} from '@/utils/constants'
import Link from 'next/link'
import React, {useCallback, useState} from 'react'

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

const Buttons = ({className}: { className?: string }) => {

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

export default function Header() {

  const [dropdown, setDropdown] = useState(false)

  const openDropdown = useCallback(() => setDropdown(true), [])
  const closeDropdown = useCallback(() => setDropdown(false), [])

  const ref = useOnClickOutsideRef(closeDropdown)

  return (
    <header className='fixed inset-x-0 top-0 z-50 h-[66px] bg-gray text-black'>
      <nav className='mx-auto flex w-full max-w-[1100px] justify-between p-3'>
        <Link
          href={routes.main}
          className='flex items-center gap-2'
        >
          <span className='text-2xl'>INNOADS</span>
          <span className='hidden lg:inline'>|</span>
          <span className='hidden lg:inline'>Доска объявлений города Иннополис</span>
        </Link>
        <div ref={ref} className='lg:hidden'>
          <Button onClick={openDropdown}>
            &#8801;
          </Button>

          {dropdown && (
            <Dropdown closeToggle={() => openDropdown}>
              <Buttons className='flex-col mb-8'/>
            </Dropdown>
          )}
        </div>
        <div className='hidden items-center gap-2 lg:flex'>
          <Buttons className='ml-4 flex items-center gap-1'/>
        </div>
      </nav>
    </header>
  )
}
