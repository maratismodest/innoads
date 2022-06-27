import axios from "axios";
import cn from 'classnames'
import Button from "components/Button/Button";
import Item from "components/Item/Item";
import MainLayout from "components/MainLayout/MainLayout";
import {useAuth, UserProps} from "context/AuthContext";
import {getDictionary} from "functions/getDictionary";
import {getUserPosts} from "functions/getUserPosts";
import {requestConfig} from "functions/handleDeleteImage";
import {PostInterface} from "interfaces";
import jwt from 'jsonwebtoken'
import {useTranslation} from "next-i18next";
import Link from "next/link";
import {GetStaticProps} from "next/types";
import React, {useEffect, useState} from "react";
import ReactModal from "react-modal";
import {useModal} from "react-modal-hook";
// @ts-ignore
import TelegramLoginButton from "react-telegram-login";
import classes from 'styles/classes.module.scss'
import profile from 'styles/Profile.module.scss'
import {modalStyles, routes, titles} from "../constants";

const error = 'Вам надо Указать Алиас в Телеграм, иначе вы не сможете подавать объявления! Добавьте алиас у себя в аккаунте, перезагрузите страницу и попробуйте авторизоваться у нас снова'

export default function Profile() {

    const [showModal, hideModal] = useModal(() => (
        <ReactModal isOpen style={modalStyles}>
            <p>{error}</p>
            <hr/>
            <Button onClick={hideModal}>OK</Button>
        </ReactModal>
    ), []);

    const [posts, setPosts] = useState<PostInterface[]>([])
    const {user, login, logout} = useAuth();
    const {t} = useTranslation('profile')

    const handleTelegramResponse = async (response: any) => {
        const {username} = response
        if (!username) {
            return showModal()
        }
        try {
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/telegram`, response, requestConfig)
            const decoded = jwt.verify(data.token, `${process.env.NEXT_PUBLIC_JWT_SECRET}`);

            if (decoded) {
                localStorage.setItem('token', data.token)
                login(decoded as UserProps)
            }
            return
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        if (user) {
            getUserPosts(user.id).then((res) => setPosts(res))
        }
    }, [user])

    if (!user) {
        return (
            <MainLayout title={titles.profile}>
                <div className={classes.center}>
                    <h2>{t('authorization')}</h2>
                    <TelegramLoginButton
                        dataOnauth={handleTelegramResponse}
                        botName="InnoAdsPostBot"
                    />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout
            title={titles.profile}
            description={titles.profile}
            className={profile.main}
        >
            <h1 className={cn(classes.title)}>{t('cabinet')}</h1>
            {posts.length > 0 ? (
                <ul className={cn(classes.mt40, classes.items)}>
                    {posts.map((post: PostInterface) =>
                        <Item post={post} key={post.id} edit={true}/>)}
                </ul>
            ) : <div className={profile.addBlock}>
                <Link href={routes.add} passHref>
                    <Button title={t('addAd', {ns: 'common'})}
                            className={cn(classes.centerBtn, classes.mt20)}>&#43;
                    </Button>
                </Link>
                <p>Опубликуйте объявление, и его увидят потенциальные покупатели</p>
                <Link href={routes.add} passHref>
                    <Button title={t('addAd', {ns: 'common'})}
                            className={cn(classes.centerBtn, classes.mt20)}>{t('addAd', {ns: 'common'})}
                    </Button>
                </Link>
            </div>
            }
            <div className={cn(classes.center, profile.exit)}>
                <Button onClick={logout}>{t('exit')}</Button>
            </div>

        </MainLayout>
    )

}

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await getDictionary(locale, ['profile'])),
        },
    };
}
