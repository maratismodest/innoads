import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useMemo, useState } from 'react'
import { useAuth } from 'hooks/useAuth'
import useOnClickOutsideRef from 'hooks/useOnClickOutsideRef'
import { Routes } from 'utils/routes'

import Button from 'components/Button'
import Dropdown from 'components/Dropdown'
import Switcher from 'components/Switcher'

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
        <div className='fixed h-[66px] top-0 left-0 right-0 z-50 text-black bg-grey'>
            <nav className='w-full max-w-[1100px] p-3 mx-auto flex justify-between'>
                <Link
                    href={Routes.main}
                    className='flex gap-2 items-center'
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
                            <Switcher />
                        </Dropdown>
                    )}
                </div>
                <div className='hidden lg:flex gap-2 items-center'>
                    <Switcher />
                    <Buttons className='ml-4 flex gap-2 items-center' />
                </div>
            </nav>
        </div>
    )
}

export default Header
