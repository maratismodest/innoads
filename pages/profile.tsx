import axios from "axios";
import Button from "components/Button/Button";
import Item from "components/Item/Item";
import {MainLayout} from "components/MainLayout/MainLayout";
import {useAuth, UserProps} from "context/AuthContext";
import {getUserPosts} from "functions/getUserPosts";
import {requestConfig} from "functions/handleDeleteImage";
import {PostInterface} from "interfaces";
import jwt from 'jsonwebtoken'
import React, {useEffect, useState} from "react";
// @ts-ignore
import TelegramLoginButton from "react-telegram-login";
import classes from 'styles/classes.module.scss'
import profile from 'styles/Profile.module.scss'
import {routes, titles} from "../constants";

export default function Profile() {
    const [posts, setPosts] = useState<PostInterface[]>([])
    const {user, login, logout} = useAuth();

    const handleTelegramResponse = async (response: any) => {
        const {username} = response
        if (!username) {
            return alert('Вам надо Указать Алиас в Телеграм, иначе вы не сможете подавать объявления! Добавьте алиас у себя в аккаунте, перезагрузите страницу и попробуйте авторизоваться у нас снова')
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
                    <h2>Авторизация</h2>
                    <TelegramLoginButton
                        dataOnauth={handleTelegramResponse}
                        botName="InnoAdsPostBot"
                    />
                </div>
            </MainLayout>
        );
    }

    if (!user.username) {
        return (
            <MainLayout title={titles.profile}>
                <div className={classes.center}>
                    <h2>Вам надо Указать Алиас в Телеграм, иначе вы не сможете подавать объявления!</h2>
                    <p>Добавьте алиас у себя в аккаунте, перезагрузите страницу и попробуйте авторизоваться у нас
                        снова</p>
                    <a href={routes.profile}>
                        <Button>Перезагрузить страницу</Button>
                    </a>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout title={titles.profile} className={profile.main}>
            <h2 className={classes.center}>Личный кабинет</h2>
            <ul className={profile.description}>
                <li><Button>&#8679;</Button> <span>Опубликовать повторно</span></li>
                <li><Button>&#10000;</Button> <span>Редактировать</span></li>
                <li><Button>&#10008;</Button> <span>Удалить</span></li>
            </ul>
            <h3 className={classes.center}>Ваши объявления</h3>
            {posts.length > 0 ? (
                <ul className={classes.items}>
                    {posts.map((post: PostInterface) => <Item post={post} key={post.id} edit={true}/>)}
                </ul>
            ) : <p className={classes.center}>Пусто. Может, пора создать объявление?</p>}
            <Button onClick={logout} className={profile.exit}>Выйти</Button>
        </MainLayout>
    )

}
