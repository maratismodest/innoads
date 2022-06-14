import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useMemo, useState, useCallback} from "react";
import {isDesktop, isMobile, isTablet} from "react-device-detect";
import {NO_IMAGE, routes} from "../../constants";
import {PostInterface} from "../../interfaces";
import Button from "../Button/Button";
import classes from "./Item.module.scss";
import {requestConfig} from "../../functions/handleDeleteImage";
import cn from 'classnames'

interface ItemInterface {
    post: PostInterface,
    edit?: boolean
}

const promoted = [917, 1039, 800, 1031]

export const Item = ({post, edit}: ItemInterface) => {
    const router = useRouter()
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
    const [state, setState] = useState(true)

    const deletePost = useCallback(async (id: number) => {
        const answer = confirm('Удалить объявление?')
        if (answer) {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, requestConfig)
            alert('Объявление удалено!')
            setState(false)
        }
    }, [])

    const handleRefresh = useCallback(async () => {
        const answer = confirm('Опубликовать повторно объявление?')
        if (answer) {
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/telegram/post`, {...post}, requestConfig)
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
                    ...post,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }, requestConfig)
                alert('Объявление поднято в поиске!')
                return
            } catch (e) {
                alert('Что-то пошло не так!')
                console.log(e)
            }
        }
        return

    }, [post])

    const editPost = useCallback(() => {
        const answer = confirm('Редактировать объявление?')
        if (answer) {
            router.push(routes.edit + '/' + post.slug)
        }
    }, [post, router])

    if (!state) {
        return null
    }

    const {id, slug, title, preview, price} = post
    return (
        <li key={slug} className={cn(classes.item, {
            [classes.promoted]: promoted.includes(id) && !edit
        })}>
            {edit && (
                <>
                    <Button title='Удалить' className={classes.delete} onClick={() => deletePost(id)}>&#10008;</Button>
                    <Button title='Редактировать' className={classes.edit} onClick={editPost}>&#10000;</Button>
                    <Button title='Опубликовать повторно' className={classes.promote}
                            onClick={handleRefresh}>&#8679;</Button>
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
                        {price === 0 ? 'Даром' : <>{price} <span>&#8381;</span></>}
                    </p>
                    <h2>{title}</h2>
                </a>
            </Link>
        </li>
    )
}
export default Item
