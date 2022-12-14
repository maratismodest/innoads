import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useAuth } from 'hooks/useAuth'
import useOnClickOutsideRef from 'hooks/useOnClickOutsideRef'
import { Routes } from 'utils/constants'

import Button from 'components/Button/Button'
import Dropdown from 'components/Dropdown/Dropdown'

import Switcher from './switcher'

import classes from './Header.module.scss'

const Header = (): JSX.Element | null => {
    const { t } = useTranslation()
    const { user } = useAuth()
    const [mounted, setMounted] = useState(false)
    const [menu, setMenu] = useState(false)

    const ref = useOnClickOutsideRef(() => setMenu(false))

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    if (isMobile) {
        return (
            <nav data-testid='nav' className={classes.header}>
                <div className={classes.headerMain}>
                    <Link
                        href={Routes.main}
                        className={classes.headerHeader}
                    >
                        <span className={classes.headerTitle}>INNOADS</span>
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
                                    <li>
                                        <Link
                                            href={Routes.profile}
                                        >{t(user ? 'profile' : 'login')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={Routes.add}
                                        >
                                            {t('addAd')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={Routes.favourites}
                                        >
                                            {t('favourite')}
                                        </Link>
                                    </li>
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
        <nav data-testid='nav' className={classes.header}>
            <div className={classes.headerMain}>
                <Link
                    href={Routes.main}
                    className={classes.headerHeader}
                >
                    <span className={classes.headerTitle}>INNOADS</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span className={classes.headerDescription}>
                        {t('innopolisClassified')}
                    </span>
                </Link>
                <div className={classes.buttons}>
                    <div className={classes.switch}>
                        <Switcher />
                    </div>
                    <Link
                        href={Routes.favourites}
                    >
                        {t('favourite')}
                    </Link>
                    <Link
                        href={Routes.profile}
                        className={classes.headerUser}
                    >
                        {user
                            ? t('profile')
                            : `${t('login')} | ${t('registration')}`}
                    </Link>

                    <Link href={Routes.add}>
                        <Button className={classes.headerButton}>
                            {t('addAd')}
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Header
