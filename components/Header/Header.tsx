import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useMemo, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useAuth } from 'hooks/useAuth'
import useOnClickOutsideRef from 'hooks/useOnClickOutsideRef'
import { Routes } from 'utils/routes'

import Button from 'components/Button/Button'
import Dropdown from 'components/Dropdown/Dropdown'
import Switcher from 'components/Switcher/Switcher'

import classes from './Header.module.scss'

const Header = (): JSX.Element | null => {
    const [mounted, setMounted] = useState(false)
    const { t } = useTranslation()
    const { user } = useAuth()
    const [menu, setMenu] = useState(false)

    const ref = useOnClickOutsideRef(() => setMenu(false))

    const mobileMenu = useMemo(() => [
        {
            id: 1,
            href: Routes.profile,
            text: t(user ? 'profile' : 'login'),
        },
        {
            id: 2,
            href: Routes.add,
            text: t('addAd'),
        },
        {
            id: 3,
            href: Routes.favourites,
            text: t('favourite'),
        },
    ], [user, t])

    const desktopMenu = useMemo(() => [
        {
            id: 1,
            href: Routes.favourites,
            text: t('favourite'),
        },
        {
            id: 2,
            href: Routes.profile,
            text: t(user ? 'profile' : 'login'),
        },
    ], [user, t])

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return null
    }

    if (isMobile) {
        return (
            <nav className={classes.header}>
                <div className={classes.headerMain}>
                    <Link
                        href={Routes.main}
                        className={'flex'}
                    >
                        INNOADS
                    </Link>
                    <div ref={ref}>
                        <Button
                            onClick={() => setMenu(true)}
                            className={classes.menu}
                        >
                            &#8801;
                        </Button>

                        {menu && (
                            <Dropdown closeToggle={() => setMenu(true)}>
                                <ul>
                                    {mobileMenu.map(({ id, href, text }) =>
                                        <li key={id}>
                                            <Link href={href}>{text}</Link>
                                        </li>)}
                                </ul>
                                <Switcher />
                            </Dropdown>
                        )}
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <nav className={classes.header}>
            <div className={classes.headerMain}>
                <Link
                    href={Routes.main}
                    className={'flex'}
                >
                    <span>INNOADS</span>
                    <span>|</span>
                    <span>{t('innopolisClassified')}</span>
                </Link>
                <div className={classes.buttons}>
                    <Switcher />
                    <ul className={'flex'}>
                        {desktopMenu.map(({ id, href, text }) =>
                            <li key={id}>
                                <Link href={href}>{text}</Link>
                            </li>)}
                    </ul>
                    <Link href={Routes.add}>
                        <Button>
                            {t('addAd')}
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Header
