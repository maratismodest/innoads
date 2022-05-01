import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link";
import {useAuth} from "../context/AuthContext";
// @ts-ignore
import TelegramLoginButton from "react-telegram-login";
import {PostInterface} from "../interfaces";
import Item from "../components/Item/Item";
import {routes, titles} from "../constants";
import classes from "../styles/Index.module.scss";
import mainClasses from '../styles/classes.module.scss'
import {getUserPosts} from "../functions/getUserPosts";
import {MainLayout} from "../components/MainLayout/MainLayout";
import {handleTelegramResponse} from "../functions/handleTelegramResponse";
import Button from "../components/Button/Button";

export default function Profile() {
    const router = useRouter();
    const [posts, setPosts] = useState<PostInterface[]>([])
    const {user, login} = useAuth();

    useEffect(() => {
        if (user) {
            localStorage.setItem('username', user.username)
            localStorage.setItem('id', user.id)
            getUserPosts(user.id).then((res) => setPosts(res.content))
        }
    }, [user])


    if (!user) {
        return (
            <MainLayout title={titles.profile}>
                <div className={mainClasses.center}>
                    <h2>Авторизация</h2>
                    <TelegramLoginButton
                        dataOnauth={(e: any) => handleTelegramResponse(e, login)}
                        botName="InnoAdsProfileBot"
                        language="ru"
                    />
                </div>
            </MainLayout>
        );
    }

    if (!user.username) {
        return (
            <MainLayout title={titles.profile}>
                <div className={mainClasses.center}>
                    <h2>Вам надо Указать Алиас в Телеграм, иначе вы не сможете подавать объявления!</h2>
                    <p>Добавьте алиас у себя в аккаунте и попробуйте авторизоваться у нас снова</p>
                    <div className="unset-img">
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/Screenshot_1.png?alt=media&token=94cc89c7-fcbc-426e-bd67-3d2dec911203"
                            alt="image"
                            objectFit="contain"
                            layout="fill"
                        />
                    </div>
                    <Link href={routes.profile}>
                        <a>
                            <Button>На страницу авторизации</Button>
                        </a>
                    </Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout title={titles.profile}>
            <h2 style={{textAlign: "center"}}>Личный кабинет</h2>
            <p style={{textAlign: "center"}}>Ваши объявления</p>
            {posts.length > 0 ? (
                <ul className={classes.items}>
                    {posts.map((post: PostInterface) => <Item post={post} key={post.id} edit={true}/>)}
                </ul>
            ) : <p style={{textAlign: "center"}}>Пусто. Может, пора создать объявление?</p>}
        </MainLayout>
    )

}
