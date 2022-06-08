import Image from "next/image";
import React, {useEffect, useState} from "react";
// @ts-ignore
import TelegramLoginButton from "react-telegram-login";
import Button from "../components/Button/Button";
import Item from "../components/Item/Item";
import {MainLayout} from "../components/MainLayout/MainLayout";
import {routes, titles} from "../constants";
import {useAuth} from "../context/AuthContext";
import {getUserPosts} from "../functions/getUserPosts";
import {handleTelegramResponse} from "../functions/handleTelegramResponse";
import {PostInterface} from "../interfaces";
import classes from '../styles/classes.module.scss'
import profile from '../styles/Profile.module.scss'

export default function Profile() {
    const [posts, setPosts] = useState<PostInterface[]>([])
    // const {user, login} = useAuth();
    //

    useEffect(() => {

        getUserPosts(71233480).then((res) => setPosts(res))
    }, [])


    // useEffect(() => {
    //     if (user) {
    //         localStorage.setItem('username', user.username)
    //         localStorage.setItem('id', user.id)
    //         getUserPosts(user.id).then((res) => setPosts(res))
    //     }
    // }, [user])
    //
    //
    // if (!user) {
    //     return (
    //         <MainLayout title={titles.profile}>
    //             <div className={classes.center}>
    //                 <h2>Авторизация</h2>
    //                 <TelegramLoginButton
    //                     dataOnauth={(e: any) => handleTelegramResponse(e, login)}
    //                     botName="InnoAdsPostBot"
    //                 />
    //             </div>
    //         </MainLayout>
    //     );
    // }
    //
    // if (!user.username) {
    //     return (
    //         <MainLayout title={titles.profile}>
    //             <div className={classes.center}>
    //                 <h2>Вам надо Указать Алиас в Телеграм, иначе вы не сможете подавать объявления!</h2>
    //                 <p>Добавьте алиас у себя в аккаунте, перезагрузите страницу и попробуйте авторизоваться у нас
    //                     снова</p>
    //                 <div className="unset-img">
    //                     <Image
    //                         src="https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/Screenshot_1.png?alt=media&token=94cc89c7-fcbc-426e-bd67-3d2dec911203"
    //                         alt="image"
    //                         objectFit="contain"
    //                         layout="fill"
    //                     />
    //                 </div>
    //                 <a href={routes.profile}>
    //                     <Button>Перезагрузить страницу</Button>
    //                 </a>
    //             </div>
    //         </MainLayout>
    //     );
    // }

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
