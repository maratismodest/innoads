import {useAuth} from "context/AuthContext";
import {useTranslation} from "next-i18next";
import Link from "next/link";
import React, {useEffect, useState} from 'react';
import {isMobile} from "react-device-detect";
import {routes} from "./../../constants";
import classes from './Header.module.scss'

const Header = () => {
    const {t} = useTranslation()
    const {user} = useAuth();
    const [mounted, setMounted] = useState(false);
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
                <div>
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