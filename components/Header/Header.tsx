import React, {useEffect, useState} from 'react';
import Link from "next/link";
import classes from './Header.module.scss'
import {isMobile} from "react-device-detect";
import {useAuth} from "../../context/AuthContext";

const routes = {
    profile: '/profile',
    add: '/add',
    main: '/'
}
const Header = () => {
    const {user} = useAuth();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <nav data-testid='nav' className={classes.header}>
            <div className={classes.headerMain}>
                <Link href={routes.main}>
                    <a className={classes.headerHeader}>
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
                        <a className={classes.headerUser}>
                            {user && 'Профиль'}
                            {!user && isMobile && 'Вход'}
                            {!user && !isMobile && 'Вход | Регистрация'}
                        </a>
                    </Link>

                    <Link href={routes.add}>
                        <a>
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