import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useMemo, useState, useCallback} from "react";
import {isDesktop, isMobile, isTablet} from "react-device-detect";
import {NO_IMAGE} from "../../constants";
import {PostInterface} from "../../interfaces";
import Button from "../Button/Button";
import classes from "./Item.module.scss";
import {requestConfig} from "../../functions/handleDeleteImage";

interface ItemInterface {
    post: PostInterface,
    edit?: boolean
}

export const Item = ({post, edit}: ItemInterface) => {
    const router = useRouter()
    const size = useMemo(() => {
        if (isMobile) {
            return '50vw'
        }
        if (isTablet) {
            return '33vw'
        }
        if (isDesktop) {
            return '25vw'
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

    const editPost = () => router.push(`/edit/${post.slug}`)

    if (!state) {
        return null
    }

    const {id, slug, title, preview, price} = post
    return (
        <li key={slug} className={classes.item}>
            {edit && (
                <>
                    <div className={classes.delete}>
                        <Button onClick={() => deletePost(id)}>X</Button>
                    </div>
                    <div className={classes.edit}>
                        <Button onClick={editPost}>Редактировать</Button>
                    </div>
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
                            sizes={size}
                            title={title}
                        />
                    </div>
                    <p>
                        {price} {isNaN(post.price) ? null : "Р"}
                    </p>
                    <h2>{title}</h2>
                </a>
            </Link>
        </li>
    )
}
export default Item
