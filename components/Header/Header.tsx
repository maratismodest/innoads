import { Routes } from './../../constants'
import classes from './Header.module.scss'
import Button from 'components/Button/Button'
import Dropdown from 'components/Dropdown/Dropdown'
import { useAuth } from 'context/AuthContext'
import useOnClickOutsideRef from 'hooks/useOnClickOutsideRef'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import Switch from 'react-switch'

const Header = (): JSX.Element | null => {
    const { t, i18n } = useTranslation()
    const { user } = useAuth()
    const [mounted, setMounted] = useState(false)
    const [menu, setMenu] = useState(false)

    const ref = useOnClickOutsideRef(() => setMenu(false))
    const router = useRouter()
    const { pathname, asPath, query } = router

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    if (isMobile) {
        return (
            <nav data-testid="nav" className={classes.header}>
                <div className={classes.headerMain}>
                    <Link
                        href={Routes.main}
                        title={t('onMain') as string}
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
                                            title={t('profile') as string}
                                        >
                                            {user ? t('profile') : t('login')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={Routes.add}
                                            title={t('addAd') as string}
                                        >
                                            {t('addAd')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={Routes.favourites}
                                            title={t('favourite') as string}
                                        >
                                            {t('favourite')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Switch
                                            checkedIcon={
                                                <div
                                                    className={
                                                        classes.switchIcon
                                                    }
                                                >
                                                    En
                                                </div>
                                            }
                                            uncheckedIcon={
                                                <div
                                                    className={
                                                        classes.switchIcon
                                                    }
                                                >
                                                    Ru
                                                </div>
                                            }
                                            onChange={async () => {
                                                await router.push(
                                                    {
                                                        pathname,
                                                        query,
                                                    },
                                                    asPath,
                                                    {
                                                        locale:
                                                            i18n.language ===
                                                            'en'
                                                                ? 'ru'
                                                                : 'en',
                                                    }
                                                )
                                            }}
                                            checked={i18n.language === 'en'}
                                        />
                                    </li>
                                </ul>
                            </Dropdown>
                        )}
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <nav data-testid="nav" className={classes.header}>
            <div className={classes.headerMain}>
                <Link
                    href={Routes.main}
                    className={classes.headerHeader}
                    title={t('onMain') as string}
                >
                    <span className={classes.headerTitle}>INNOADS</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span className={classes.headerDescription}>
                        {t('innopolisClassified')}
                    </span>
                </Link>
                <div className={classes.buttons}>
                    <div className={classes.switch}>
                        <Switch
                            checkedIcon={
                                <div className={classes.switchIcon}>En</div>
                            }
                            uncheckedIcon={
                                <div className={classes.switchIcon}>Ru</div>
                            }
                            onChange={async () => {
                                await router.push(
                                    {
                                        pathname,
                                        query,
                                    },
                                    asPath,
                                    {
                                        locale:
                                            i18n.language === 'en'
                                                ? 'ru'
                                                : 'en',
                                    }
                                )
                            }}
                            checked={i18n.language === 'en'}
                        />
                    </div>
                    <Link
                        href={Routes.favourites}
                        title={t('favourite') as string}
                    >
                        {t('favourite')}
                    </Link>
                    <Link
                        href={Routes.profile}
                        className={classes.headerUser}
                        title={t('profile') as string}
                    >
                        {user
                            ? t('profile')
                            : `${t('login')} | ${t('registration')}`}
                    </Link>

                    <Link href={Routes.add} title={t('addAd') as string}>
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
