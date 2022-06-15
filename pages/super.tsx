import Image from "next/image";
import axios from "axios";
import React, {useEffect, useState} from "react";
// @ts-ignore
import TelegramLoginButton from "react-telegram-login";
import Button from "components/Button/Button";
import Item from "components/Item/Item";
import {MainLayout} from "components/MainLayout/MainLayout";
import {routes, titles} from "../constants";
import {useAuth, UserProps} from "context/AuthContext";
import {getUserPosts} from "functions/getUserPosts";
import {PostInterface} from "interfaces";
import classes from 'styles/classes.module.scss'
import profile from 'styles/Profile.module.scss'
import jwt from 'jsonwebtoken'
import {requestConfig} from "functions/handleDeleteImage";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzEyMzM0ODAsInVzZXJuYW1lIjoibWFyYXRmYWl6ZXIiLCJpYXQiOjE2NTUxMjM4MDgsImV4cCI6MTY4NjY1OTgwOH0.NaeW9a88vB3QfqYRQvacqNloNGEBKSkkXBloTVt3k5U'

export default function Super() {
    const [posts, setPosts] = useState<PostInterface[]>([])
    const {user, login} = useAuth();

    const handleTelegramResponse = async (response : any) => {
        try {
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/telegram`, response, requestConfig)
            const decoded = jwt.verify(data.token, `${process.env.NEXT_PUBLIC_JWT_SECRET}`);
            localStorage.setItem('token', data.token)
            login(decoded as UserProps)
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

    const setToken = () => {
        localStorage.setItem('token', token)
    }


    if (!user) {
        return (
            <MainLayout title={titles.profile}>
                <div className={classes.center}>
                    <h2>Авторизация</h2>
                    <TelegramLoginButton
                        dataOnauth={handleTelegramResponse}
                        botName="InnoAdsPostBot"
                    />
                    <Button onClick={setToken}>Token</Button>
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
                    <div className="unset-img">
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/Screenshot_1.png?alt=media&token=94cc89c7-fcbc-426e-bd67-3d2dec911203"
                            alt="image"
                            objectFit="contain"
                            layout="fill"
                        />
                    </div>
                    <a href={routes.profile}>
                        <Button>Перезагрузить страницу</Button>
                    </a>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout title={titles.profile}>
            <h2 className={classes.center}>Личный кабинет</h2>
            <ul className={profile.description}>
                <li><Button disabled={true}>&#8679;</Button> <span>Опубликовать повторно</span></li>
                <li><Button disabled={true}>&#10000;</Button> <span>Редактировать</span></li>
                <li><Button disabled={true}>&#10008;</Button> <span>Удалить</span></li>
            </ul>
            <p className={classes.center}>Ваши объявления</p>

            {posts.length > 0 ? (
                <ul className={classes.items}>
                    {posts.map((post: PostInterface) => <Item post={post} key={post.id} edit={true}/>)}
                </ul>
            ) : <p style={{textAlign: "center"}}>Пусто. Может, пора создать объявление?</p>}
        </MainLayout>
    )

}
