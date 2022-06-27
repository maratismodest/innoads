import Button from 'components/Button/Button';
import MainLayout from 'components/MainLayout/MainLayout';
import {useTranslation} from "next-i18next";
import Link from 'next/link';
import React from 'react';
import classes from 'styles/classes.module.scss'
import {routes, titles} from '../../constants';

const GoToProfile = (): JSX.Element => {
    const {t} = useTranslation()
    return (
        <MainLayout title={titles.auth}>
            <div className={classes.center}>
                <h2>{t('notAuthorized')}</h2>
                <Link href={routes.profile} passHref>
                    <Button>{t('goToAuth')}</Button>
                </Link>
            </div>
        </MainLayout>
    );
};

export default GoToProfile;
