import {useAuth} from "context/AuthContext";
import {useTranslation} from "next-i18next";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useEffect, useState} from 'react';
import {isMobile} from "react-device-detect";
import Switch from "react-switch";

import {routes} from "./../../constants";
import classes from './Header.module.scss'

const Header = () => {
    const {t, i18n} = useTranslation()
    const {user} = useAuth();
    const router = useRouter()
    const {pathname, asPath, query} = router
    const [checked, setChecked] = useState(false)

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, []);

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
                <div className={classes.item}>

                    <div style={{marginRight: 8}}>
                        <Switch
                            onChange={() => {
                                router.push({pathname, query}, asPath, {locale: i18n.language === 'en' ? 'ru' : 'en'})
                            }}
                            uncheckedIcon={
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: 15,
                                        paddingRight: 2,
                                        color: 'white'
                                    }}
                                >
                                    Ru
                                </div>
                            }
                            checkedIcon={
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: 15,
                                        paddingLeft: 2,
                                        color: 'white'
                                    }}
                                >
                                    En
                                </div>
                            }
                            checked={i18n.language === 'en'}
                        />
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
            </div>
        </nav>
    );
};

export default Header;