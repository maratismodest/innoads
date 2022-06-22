import axios from "axios";
import cn from 'classnames'
import Button from "components/Button/Button";
import {useAuth} from "context/AuthContext";
import {requestConfig} from "functions/handleDeleteImage";
import {googleTranslateText} from "functions/translateText";
import {PostInterface} from "interfaces";
import {useTranslation} from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {isDesktop, isMobile, isTablet} from "react-device-detect";
import {NO_IMAGE, routes} from "../../constants";
import classes from "./Item.module.scss";

interface ItemInterface {
    post: PostInterface,
    edit?: boolean
}

const promoted = [917, 1039, 800, 1031]

export const Price = ({price}: { price: number }): JSX.Element => price !== 0 ? <>{price} <span>&#8381;</span></> :
    <span>Цена не указана</span>


export const Item = ({post, edit}: ItemInterface) => {
    const {id, slug, title, preview, price} = post
    const {t, i18n} = useTranslation()
    const [header, setHeader] = useState<string>(title)
    const router = useRouter()
    const {token} = useAuth()

    const sizes = useMemo(() => {
        if (isMobile) {
            return 'calc((100vw - 42px) / 2)'
        }
        if (isTablet) {
            return '33vw'
        }
        if (isDesktop) {
            return '205px'
        }
    }, [])

    const updatePost = useCallback(async () => {
        const answer = confirm('Опубликовать повторно объявление в канале и поднять его на сайте?')
        if (answer) {
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/telegram/post`, {...post}, requestConfig)
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/post/${post.id}`, {
                    ...post,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                alert('Объявление поднято в поиске!')
                return
            } catch (e) {
                alert('Что-то пошло не так!')
                console.log(e)
            }
        }
        return

    }, [post, token])

    const editPost = useCallback(async () => {
        const answer = confirm('Редактировать объявление?')
        if (answer) {
            await router.push(routes.edit + '/' + post.slug)
        }
    }, [post, router])

    const deletePost = useCallback(async (id: number) => {
        const answer = confirm('Удалить объявление?')
        if (answer) {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            alert('Объявление удалено! Перезагрузите страницу')
        }
    }, [token])

    const translateTitle = useCallback(async (): Promise<void> => {
        const translate = await googleTranslateText(title);
        if (translate) {
            setHeader(translate)
        }
    }, [title])

    useEffect(() => {
        if (i18n.language === 'en') {
            translateTitle();
        }

    }, [i18n, translateTitle]);

    return (
        <li key={slug} className={cn(classes.item, {
            [classes.promoted]: promoted.includes(id) && !edit
        })}>
            {edit && (
                <>
                    <Button title='Удалить' className={classes.delete} onClick={() => deletePost(id)}>&#10008;</Button>
                    <Button title='Редактировать' className={classes.edit} onClick={editPost}>&#10000;</Button>
                    <Button title='Опубликовать повторно' className={classes.promote}
                            onClick={updatePost}>&#8679;</Button>
                </>

            )}
            <Link href={`/post/${slug}`}>
                <a title={title}>
                    <div className={classes.imageWrapper}>
                        <Image
                            alt={title}
                            src={preview || NO_IMAGE}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={NO_IMAGE}
                            sizes={sizes}
                            title={title}
                        />
                    </div>
                    <p>
                        <Price price={price}/>
                    </p>
                    <h2>{header}</h2>
                </a>
            </Link>
        </li>
    )
}
export default Item

