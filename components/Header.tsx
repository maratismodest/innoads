import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useMemo, useState } from 'react'
import { useAuth } from 'hooks/useAuth'
import useOnClickOutsideRef from 'hooks/useOnClickOutsideRef'
import { Routes } from 'utils/routes'

import Button from 'components/Button'
import Dropdown from 'components/Dropdown'

import LanguageSwitcher from './LanguageSwitcher'

const Buttons = ({ className }: { className?: string }) => {
    const { user } = useAuth()
    const { t } = useTranslation()
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
            {menu.map(({ id, href, children }) =>
                <li key={id} className='mb-6 lg:mb-0'>
                    <Link href={href}>{children}</Link>
                </li>)
            }
        </ul>
    )
}

const Header = (): JSX.Element | null => {
    const { t } = useTranslation()

    const [dropdown, setDropdown] = useState(false)

    const openDropdown = useCallback(() => setDropdown(true), [])
    const closeDropdown = useCallback(() => setDropdown(false), [])

    const ref = useOnClickOutsideRef(closeDropdown)

    return (
        <nav className='fixed h-[66px] top-0 left-0 right-0 z-50 text-black bg-grey'>
            <div className='w-full max-w-[1100px] p-3 mx-auto flex justify-between'>
                <Link
                    href={Routes.main}
                    className='flex'
                >
                    <span className='text-2xl'>INNOADS</span>
                    <span className='hidden lg:inline'>|</span>
                    <span className='hidden lg:inline'>{t('innopolisClassified')}</span>
                </Link>
                <div ref={ref} className='lg:hidden'>
                    <Button
                        onClick={openDropdown}
                    >
                        &#8801;
                    </Button>

                    {dropdown && (
                        <Dropdown closeToggle={() => openDropdown}>
                            <Buttons className='flex-col'/>
                            <LanguageSwitcher />
                        </Dropdown>
                    )}
                </div>
                <div className='hidden lg:flex'>
                    <LanguageSwitcher />
                    <Buttons className='flex' />
                </div>
            </div>
        </nav>
    )
}

export default Header
