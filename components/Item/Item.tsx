import axios from "axios";
import cn from 'classnames'
import Button from "components/Button/Button";
import {useAuth} from "context/AuthContext";
import dayjs from 'dayjs'
import {PostInterface} from "interfaces";
import {useTranslation} from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useCallback, useEffect, useMemo, useState,} from "react";
import {isDesktop, isMobile, isTablet} from "react-device-detect";
import ReactModal from "react-modal";
import {useModal} from "react-modal-hook";
import {modalStyles, NO_IMAGE, routes} from "../../constants";
import classes from "./Item.module.scss";

interface ItemInterface {
    post: PostInterface,
    edit?: boolean
}

// const promoted = [917, 1039, 800, 1031]

const success = {
    updated: 'Объявление поднято в поиске!',
    deleted: 'Объявление удалено! Перезагрузите страницу, чтобы вы увидели изменения'
}
const errors = {
    wentWrong: 'Что-то пошло не так!',
    noCase: "Нет таких значений"
}

export const Price = ({price}: { price: number }): JSX.Element => price !== 0 ? <>{price} <span>&#8381;</span></> :
    <span>Цена не указана</span>


enum ModalText {
    edit = 'Редактировать объявление?',
    republish = 'Опубликовать повторно объявление в канале и поднять его на сайте?',
    delete = "Удалить объявление?"
}

const Item = ({post, edit = false}: ItemInterface): JSX.Element => {
    const [favourite, setFavourite] = useState(false)
    const {id, slug, title, body, preview, price, categoryId, images, telegram} = post
    const {t, i18n} = useTranslation('profile')
    const [header, setHeader] = useState<string>(title)
    const router = useRouter()
    const {token} = useAuth()

    const [modalText, setModalText] = useState<ModalText | undefined>()

    const [showModal, hideModal] = useModal(() => (
        <ReactModal isOpen style={modalStyles}>
            <p>{modalText}</p>
            <hr/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button onClick={handleFunction}>Да</Button>
                <Button onClick={hideModal}>Нет</Button>
            </div>
        </ReactModal>
    ), [modalText]);

    const handleFunction = useCallback(async () => {
        switch (modalText) {
            case ModalText.edit: {
                try {
                    await router.push(routes.edit + '/' + slug)
                } catch (e) {
                    alert(errors.wentWrong)
                    console.log(e)
                }
                break;
            }
            case ModalText.delete: {
                try {
                    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                    alert(success.deleted)
                    hideModal()
                } catch (e) {
                    alert(errors.wentWrong)
                    console.log(e)
                }
                break;
            }
            case ModalText.republish: {
                const now = new Date().getTime()
                const created = new Date(post.createdAt).getTime()
                const sevenDays = 1000 * 60 * 60 * 24 * 7

                if ((now - created) < sevenDays) {
                    await alert(`Объявление можно публиковать повторно не чаще раз в неделю! Можно подать повторно ${dayjs(created + sevenDays).format("DD.MM.YYYY")}`);
                    hideModal()
                } else {
                    try {
                        // await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/telegram/post`, {...post})
                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/telegram/post`, post, {
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        })

                        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/post/${post.id}`, {
                            ...post,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }, {
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        })
                        alert(success.updated)
                        hideModal()
                    } catch (e) {
                        hideModal()
                        alert(errors.wentWrong)
                        console.log(e)
                    }
                }

                break;
            }
            default:
                alert(errors.noCase);
        }
    }, [modalText, post, router, token, hideModal, id, slug])

    useEffect(() => {
        if (modalText) {
            showModal()
        }
    }, [modalText, showModal])

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

    const handleFavourite = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault()
        const favourites = localStorage.getItem('favourites')
        if (favourites) {
            const list = JSON.parse(favourites)
            const isFavourite = list.find((x: PostInterface) => x.slug === slug)
            if (isFavourite) {
                setFavourite(false)
                const res = list.filter((x: PostInterface) => x.slug !== slug)
                localStorage.setItem('favourites', JSON.stringify(res))
            } else {
                setFavourite(true)
                const res = [...list, post]
                localStorage.setItem('favourites', JSON.stringify(res))
            }
        }
    }, [slug, post])

    useEffect(() => {
        const favourites = localStorage.getItem('favourites')
        if (favourites) {
            const slugs = JSON.parse(favourites)
            const isFavourite = slugs.find((x: PostInterface) => x.slug === slug)
            if (isFavourite) {
                setFavourite(true)
            }
        } else {
            localStorage.setItem('favourites', JSON.stringify([]))
        }
    }, [slug])

    return (
        <li key={slug} className={classes.item}>
            {edit && (
                <>
                    <Button title={t('delete')}
                            className={cn(classes.itemBtn, classes.itemBtnDelete)}
                            transparent
                            onClick={() => setModalText(ModalText.delete)}
                    >
                        &#10008;</Button>
                    <Button title={t('edit')}
                            className={cn(classes.itemBtn, classes.itemBtnEdit)}
                            onClick={() => setModalText(ModalText.edit)}
                            transparent
                    >
                        &#10000;</Button>
                    <Button
                        title={t('publishAgain')}
                        className={cn(classes.itemBtn, classes.itemBtnPromote)}
                        transparent
                        onClick={() => setModalText(ModalText.republish)}
                    >
                        &#8679;
                    </Button>
                </>

            )}
            <Link href={`${routes.post}/${slug}`} passHref>
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
                    <div className={classes.price}>
                        <Price price={price}/>
                        <div className={classes.favourite}>
                            <Image
                                src={favourite ? '/svg/heart-red.svg' : '/svg/heart.svg'}
                                layout={'fill'}
                                onClick={handleFavourite}
                                alt={''}
                            />
                        </div>

                    </div>
                    <h2>{header}</h2>
                </a>
            </Link>
        </li>
    )
}
export default Item

// const translateTitle = useCallback(async (): Promise<void> => {
//     const translate = await googleTranslateText(title);
//     if (translate) {
//         setHeader(translate)
//     }
// }, [title])
//
// useEffect(() => {
//     if (i18n.language === 'en') {
//         translateTitle();
//     }
//
// }, [i18n, translateTitle]);
