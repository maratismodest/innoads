import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useMemo, useState} from "react";
import {isDesktop, isMobile, isTablet} from "react-device-detect";
import {PostInterface} from "../../interfaces";
import Button from "../Button/Button";
import classes from "./Item.module.scss";

interface ItemInterface {
    post: PostInterface,
    edit?: boolean
    margin?: number
}


export const Item = ({post, edit, margin}: ItemInterface) => {
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
    }, [isMobile, isTablet, isDesktop])

    const [state, setState] = useState(true)
    const deletePost = async (id: number) => {
        const answer = confirm('Удалить объявление?')

        if (answer) {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`)
            alert('Объявление удалено!')
            setState(false)
            return console.log(post)
        }
        return console.log("Вы решили не удалять объявление!")
    }

    const editPost = async (id: number) => {
        return router.push(`/edit/${post.slug}`)
    }

    if (!state) {
        return null
    }
    return (
        <li key={post.slug} className={classes.item} style={{marginRight: margin}}>
            {edit && (
                <>
                    <div className={classes.delete}>
                        <Button onClick={() => deletePost(post.id)}>X</Button>
                    </div>
                    <div className={classes.edit}>
                        <Button onClick={() => editPost(post.id)}>Редактировать</Button>
                    </div>
                </>

            )}
            <Link href={`/post/${post.slug}`}>
                <a>
                    <div className={classes.imageWrapper}>
                        <Image
                            alt="image"
                            src={post.preview || "/no-image.jpeg"}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL="/no-image.jpeg"
                            sizes={size}
                        />
                    </div>
                    <h2>
                        {post.price} {isNaN(post.price) ? null : "Р"}
                    </h2>
                    <p>{post.title}</p>
                </a>
            </Link>
        </li>
    )
}
export default Item
