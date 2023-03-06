import Link from 'next/link'
import {useTranslation} from 'next-i18next'
import React, {useCallback, useMemo, useState} from 'react'
import {useAuth} from '@/hooks/useAuth'
import useOnClickOutsideRef from '@/hooks/useOnClickOutsideRef'
import {Routes} from '@/utils/routes'

import Dropdown from '@/components/Dropdown'
import Switcher from '@/components/Switcher'
import Button from '@/components/ui/Button'

const Buttons = ({className}: { className?: string }) => {
  const {user} = useAuth()
  const {t} = useTranslation()
  const menu = useMemo(() => [
    {
      id: 'user',
      href: Routes.profile,
      children: t(user ? 'profile' : 'login'),
    },
    {
      id: 'favourite',
      href: Routes.favourites,
      children: t('favourite'),
    },
    {
      id: 'blog',
      href: Routes.blog,
      children: t('blog'),
    },
    {
      id: 'add',
      href: Routes.add,
      children: <Button>{t('addAd')}</Button>,
    },
  ], [user, t])

  return (
    <ul className={className}>
      {menu.map(({id, href, children}) =>
        <li key={id} className='mb-6 lg:mb-0' data-testid={id}>
          <Link href={href}>{children}</Link>
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
              <Buttons className='flex-col'/>
              <Switcher/>
            </Dropdown>
          )}
        </div>
        <div className='hidden items-center gap-2 lg:flex'>
          <Switcher/>
          <Buttons className='ml-4 flex items-center gap-2'/>
        </div>
      </nav>
    </header>
  )
}

export default Header
