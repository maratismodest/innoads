import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./Item.module.scss";
import {PostInterface} from "../../interfaces";
import Button from "../Button/Button";
import axios from "axios";

interface ItemInterface {
    post: PostInterface,
    edit?: boolean
    margin?: number
}


export const Item = ({post, edit, margin}: ItemInterface) => {

    const [state, setState] = useState(true)
    const deletePost = async (id: number) => {
        console.log(id)

        const answer = confirm('Удалить объявление?')

        if (answer) {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`)
            alert('Объявление удалено!')
            setState(false)
            return console.log(post)
        }
        return console.log("Вы решили не удалять объявление!")
    }
    if (!state) {
        return null
    }
    return (
        <li key={post.slug} className={classes.item} style={{marginRight: margin}}>
            {edit && (
                <div className={classes.edit}>
                    <Button onClick={() => deletePost(post.id)}>X</Button>
                </div>
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
