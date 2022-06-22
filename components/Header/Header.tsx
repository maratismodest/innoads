import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";
import {useAuth} from "context/AuthContext";
import {useTranslation} from "next-i18next";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useEffect, useState} from 'react';
import {useDetectClickOutside} from "react-detect-click-outside";
import {isMobile} from "react-device-detect";
import Switch from "react-switch";
import {routes} from "./../../constants";

import classes from './Header.module.scss'

const Header = () => {
    const {t, i18n} = useTranslation()
    const {user} = useAuth();
    const [mounted, setMounted] = useState(false);
    const [menu, setMenu] = useState(false)

    const ref = useDetectClickOutside({onTriggered: () => setMenu(false)})
    const router = useRouter()
    const {pathname, asPath, query} = router

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;


    return (
        <nav data-testid='nav' className={classes.header}>
            <div className={classes.headerMain}>
                <Link href={routes.main}>
                    <a className={classes.headerHeader} title='На главную'>
                        <span className={classes.headerTitle}>INNOADS</span>
                        {!isMobile && (
                            <>
                                <span>&nbsp;|&nbsp;</span>
                                <span className={classes.headerDescription}>{t('innopolisClassified')}</span>
                            </>
                        )}
                    </a>
                </Link>
                {!isMobile && <div className={classes.buttons}>
                    <div className={classes.switch}>
                        <Switch
                            checkedIcon={<div className={classes.switchIcon}>En</div>}
                            uncheckedIcon={<div className={classes.switchIcon}>Ru</div>}
                            onChange={async () => {
                                await router.push({
                                    pathname,
                                    query
                                }, asPath, {locale: i18n.language === 'en' ? 'ru' : 'en'})
                            }}
                            checked={i18n.language === 'en'}/>
                    </div>
                    <Link href={routes.profile}>
                        <a className={classes.headerUser} title={t('profile')}>
                            {user && t('profile')}
                            {!user && isMobile && t('login')}
                            {!user && !isMobile && `${t('login')} | ${t('registration')}`}
                        </a>
                    </Link>

                    <Link href={routes.add}>
                        <a title={t('addAd')}>
                            <button className={classes.headerButton}>{!isMobile ? t('addAd') : '+'}
                            </button>
                        </a>
                    </Link>

                </div>
                }
                {isMobile && <div ref={ref}>
                    <Button
                        onClick={() => setMenu(true)}
                        className={classes.menu}
                    >
                        &#8801;
                    </Button>

                    {menu &&
                        <Dropdown
                            closeToggle={() => setMenu(true)}
                        >
                            <ul>
                                <li>
                                    <Link href={routes.profile}>
                                        <a title={t('profile')}>
                                            {user && t('profile')}
                                            {!user && t('login')}
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={routes.add}>
                                        <a title={t('addAd')}>
                                            {t('addAd')}
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Switch
                                        checkedIcon={<div className={classes.switchIcon}>En</div>}
                                        uncheckedIcon={<div className={classes.switchIcon}>Ru</div>}
                                        onChange={async () => {
                                            await router.push({
                                                pathname,
                                                query
                                            }, asPath, {locale: i18n.language === 'en' ? 'ru' : 'en'})
                                        }}
                                        checked={i18n.language === 'en'}/>
                                </li>
                            </ul>


                        </Dropdown>}
                </div>}

            </div>
        </nav>
    );
};

export default Header;