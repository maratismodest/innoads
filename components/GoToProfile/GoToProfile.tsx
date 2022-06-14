import Button from 'components/Button/Button';
import {MainLayout} from 'components/MainLayout/MainLayout';
import Link from 'next/link';
import React from 'react';
import classes from 'styles/classes.module.scss'
import {routes, titles} from '../../constants';

const GoToProfile = () => {
    return (
        <MainLayout title={titles.auth}>
            <div className={classes.center}>
                <h2>Вы не авторизованы</h2>
                <Link href={routes.profile} passHref>
                    <Button>Перейти на страницу авторизации</Button>
                </Link>
            </div>
        </MainLayout>
    );
};

export default GoToProfile;