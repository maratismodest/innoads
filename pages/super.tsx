import Button from "components/Button/Button";
import {MainLayout} from "components/MainLayout/MainLayout";
import {getDictionary} from "functions/getDictionary";
import {useTranslation} from "next-i18next";
import {GetStaticProps} from "next/types";
import React from "react";
// @ts-ignore
import TelegramLoginButton from "react-telegram-login";
import classes from 'styles/classes.module.scss'
import {titles} from "../constants";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzEyMzM0ODAsInVzZXJuYW1lIjoibWFyYXRmYWl6ZXIiLCJpYXQiOjE2NTUxMjM4MDgsImV4cCI6MTY4NjY1OTgwOH0.NaeW9a88vB3QfqYRQvacqNloNGEBKSkkXBloTVt3k5U'

export default function Super() {
    const {t} = useTranslation()

    const setToken = () => {
        localStorage.setItem('token', token)
    }

    return (
        <MainLayout title={titles.profile}>
            <div className={classes.center}>
                <h2>{t('login')}</h2>
                <Button onClick={setToken}>Token</Button>
            </div>
        </MainLayout>
    );

}

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await getDictionary(locale)),
        },
    };
}
