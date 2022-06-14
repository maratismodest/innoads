import {useAuth} from "context/AuthContext";
import Link from "next/link";
import React, {useEffect, useState} from 'react';
import {isMobile} from "react-device-detect";
import {routes} from "./../../constants";
import classes from './Header.module.scss'

const Header = () => {
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
                                <span className={classes.headerDescription}>Доска объявлений города Иннополис</span>
                            </>
                        )}
                    </a>
                </Link>
                <div>
                    <Link href={routes.profile}>
                        <a className={classes.headerUser} title='Профиль'>
                            {user && 'Профиль'}
                            {!user && isMobile && 'Вход'}
                            {!user && !isMobile && 'Вход | Регистрация'}
                        </a>
                    </Link>

                    <Link href={routes.add}>
                        <a title='Подать объявление'>
                            <button className={classes.headerButton}>{!isMobile ? 'Добавить объявление' : '+'}
                            </button>
                        </a>
                    </Link>

                </div>
            </div>
        </nav>
    );
};

export default Header;