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
import ReactModal from "react-modal";
import {useModal} from "react-modal-hook";
import {modalStyles, NO_IMAGE, routes} from "../../constants";
import classes from "./Item.module.scss";

interface ItemInterface {
    post: PostInterface,
    edit?: boolean
}

const promoted = [917, 1039, 800, 1031]

export const Price = ({price}: { price: number }): JSX.Element => price !== 0 ? <>{price} <span>&#8381;</span></> :
    <span>Цена не указана</span>


enum ModalText {
    edit = 'Редактировать объявление?',
    republish = 'Опубликовать повторно объявление в канале и поднять его на сайте?',
    delete = "Удалить объявление?"
}

export const Item = ({post, edit}: ItemInterface) => {
    const {id, slug, title, preview, price} = post
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
                    await router.push(routes.edit + '/' + post.slug)
                } catch (e) {
                    alert('Что-то пошло не так!' + 'edit')
                    console.log(e)
                }
                break;
            }
            case ModalText.delete: {
                try {
                    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/post/${post.id}`, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                    alert('Объявление удалено! Перезагрузите страницу, чтобы вы увидели изменения')
                    hideModal()
                } catch (e) {
                    alert('Что-то пошло не так!' + 'delete')
                    console.log(e)
                }
                break;
            }
            case ModalText.republish: {
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
                    hideModal()
                } catch (e) {
                    alert('Что-то пошло не так!')
                    console.log(e)
                }
                break;
            }
            default:
                alert("Нет таких значений");
        }
    }, [modalText, id, post, router, token, hideModal])


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

    const handleUpdate = useCallback(() => {
        setModalText(ModalText.republish)
        showModal()
    }, [showModal])

    const handleEdit = useCallback(() => {
        setModalText(ModalText.edit)
        showModal()
    }, [showModal])

    const handleDelete = useCallback(() => {
        setModalText(ModalText.delete)
        showModal()
    }, [showModal])

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
                    <Button title={t('delete')} className={classes.delete}
                            onClick={handleDelete}>&#10008;</Button>
                    <Button title={t('edit')} className={classes.edit} onClick={handleEdit}>&#10000;</Button>
                    <Button title={t('publishAgain')} className={classes.promote}
                            onClick={handleUpdate}>&#8679;</Button>
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

