import Dropdown from '@/components/Dropdown'
import Switcher from '@/components/Switcher'
import Button from '@/components/ui/Button'
import useOnClickOutsideRef from '@/hooks/useOnClickOutsideRef'
import buttonStyles from "@/styles/buttonStyles";
import {Routes} from '@/utils/routes'
import {useTranslation} from 'next-i18next'
import Link from 'next/link'
import React, {useCallback, useState} from 'react'

type MenuProps = {
  href: string,
  variant: 'primary' | 'secondary',
  text: any
}

const menu: MenuProps[] = [
  {
    href: Routes.profile,
    variant: 'secondary',
    text: 'profile'
  },
  {
    href: Routes.favourites,
    variant: 'secondary',
    text: 'favourite'
  },
  {
    href: Routes.blog,
    variant: 'secondary',
    text: 'blog'
  },
  {
    href: Routes.add,
    variant: 'primary',
    text: 'addAd'
  },
]

const Buttons = ({className}: { className?: string }) => {
  const {t} = useTranslation()

  return (
    <ul className={className}>
      {menu.map(({href, text, variant}) =>
        <li key={href} className='mb-2 lg:mb-0' data-testid={href}>
          <Link href={href} className={buttonStyles({variant: variant})}>
            {t(text)}
          </Link>
        </li>)
      }
    </ul>
  )
}

const Header = (): JSX.Element | null => {
  const {t} = useTranslation()

  const [dropdown, setDropdown] = useState(false)

  const openDropdown = useCallback(() => setDropdown(true), [])
  const closeDropdown = useCallback(() => setDropdown(false), [])

  const ref = useOnClickOutsideRef(closeDropdown)

  return (
    <header className='fixed inset-x-0 top-0 z-50 h-[66px] bg-grey text-black'>
      <nav className='mx-auto flex w-full max-w-[1100px] justify-between p-3'>
        <Link
          href={Routes.main}
          className='flex items-center gap-2'
        >
          <span className='text-2xl'>INNOADS</span>
          <span className='hidden lg:inline'>|</span>
          <span className='hidden lg:inline'>{t('innopolisClassified')}</span>
        </Link>
        <div ref={ref} className='lg:hidden'>
          <Button onClick={openDropdown}>
            &#8801;
          </Button>

          {dropdown && (
            <Dropdown closeToggle={() => openDropdown}>
              <Buttons className='flex-col mb-8'/>
              <Switcher/>
            </Dropdown>
          )}
        </div>
        <div className='hidden items-center gap-2 lg:flex'>
          <Switcher/>
          <Buttons className='ml-4 flex items-center gap-1'/>
        </div>
      </nav>
    </header>
  )
}

export default Header
