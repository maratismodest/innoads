import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import cn from 'classnames'
import dayjs from 'dayjs'
import { useAuth } from 'hooks/useAuth'
import { PostInterface } from 'interfaces'
import { NO_IMAGE, Routes } from 'utils/constants'

import Button from 'components/Button/Button'

import Modal from '../Modal/Modal'
import Price from '../Price/Price'

import { errors, ModalText, success } from './utils'

import classes from './Item.module.scss'

interface ItemInterface {
    post: PostInterface
    edit?: boolean
}

const Item = ({ post, edit = false }: ItemInterface): JSX.Element => {
    const [favourite, setFavourite] = useState(false)
    const { id, slug, title, preview, price } = post
    const { t } = useTranslation('profile')
    const router = useRouter()
    const { token } = useAuth()

    const [visible, setVisible] = useState(false)
    const showModal = useCallback(() => setVisible(true), [])
    const hideModal = useCallback(() => setVisible(false), [])

    const [modalText, setModalText] = useState<ModalText | undefined>()

    const handleFunction = useCallback(async () => {
        switch (modalText) {
            case ModalText.edit: {
                try {
                    await router.push(Routes.edit + '/' + slug)
                } catch (e) {
                    alert(errors.wentWrong)
                    console.log(e)
                }
                break
            }
            case ModalText.delete: {
                try {
                    await axios.delete(
                        `${process.env.NEXT_PUBLIC_API_URL}/post/${id}`,
                        {
                            headers: {
                                authorization: `Bearer ${token}`,
                            },
                        },
                    )
                    alert(success.deleted)
                    hideModal()
                } catch (e) {
                    alert(errors.wentWrong)
                    console.log(e)
                }
                break
            }
            case ModalText.republish: {
                const now = new Date().getTime()
                const created = new Date(post.createdAt).getTime()
                const sevenDays = 1000 * 60 * 60 * 24 * 7

                if (now - created < sevenDays) {
                    await alert(
                        `Объявление можно публиковать повторно не чаще раз в неделю! Можно подать повторно ${dayjs(
                            created + sevenDays,
                        ).format('DD.MM.YYYY')}`,
                    )
                    hideModal()
                } else {
                    try {
                        await axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/telegram/post`,
                            post,
                            {
                                headers: {
                                    authorization: `Bearer ${token}`,
                                },
                            },
                        )

                        await axios.put(
                            `${process.env.NEXT_PUBLIC_API_URL}/post/${post.id}`,
                            {
                                ...post,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            },
                            {
                                headers: {
                                    authorization: `Bearer ${token}`,
                                },
                            },
                        )
                        alert(success.updated)
                        hideModal()
                    } catch (e) {
                        hideModal()
                        alert(errors.wentWrong)
                        console.log(e)
                    }
                }

                break
            }
            default:
                alert(errors.noCase)
        }
    }, [modalText, post, router, token, hideModal, id, slug])

    useEffect(() => {
        if (modalText) {
            showModal()
        }
    }, [modalText, showModal])

    const handleFavourite = useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault()
            const favourites = localStorage.getItem('favourites')
            if (favourites) {
                const list = JSON.parse(favourites)
                const isFavourite = list.find(
                    (x: PostInterface) => x.slug === slug,
                )
                if (isFavourite) {
                    setFavourite(false)
                    const res = list.filter(
                        (x: PostInterface) => x.slug !== slug,
                    )
                    localStorage.setItem('favourites', JSON.stringify(res))
                } else {
                    setFavourite(true)
                    const res = [...list, post]
                    localStorage.setItem('favourites', JSON.stringify(res))
                }
            }
        },
        [slug, post],
    )

    useEffect(() => {
        const favourites = localStorage.getItem('favourites')
        if (favourites) {
            const slugs = JSON.parse(favourites)
            const isFavourite = slugs.find(
                (x: PostInterface) => x.slug === slug,
            )
            if (isFavourite) {
                setFavourite(true)
            }
        } else {
            localStorage.setItem('favourites', JSON.stringify([]))
        }
    }, [slug])

    return (
        <>
            <Modal visible={visible}>
                <div>
                    <p>{modalText}</p>
                    <hr />
                    <div className={classes.modal}>
                        <Button onClick={handleFunction}>Да</Button>
                        <Button onClick={hideModal}>Нет</Button>
                    </div>
                </div>
            </Modal>

            <li key={slug} className={classes.item}>
                {edit && (
                    <>
                        <Button
                            title={t('delete') as string}
                            className={cn(
                                classes.itemBtn,
                                classes.itemBtnDelete,
                            )}
                            transparent
                            onClick={() => {
                                setModalText(ModalText.delete)
                                showModal()
                            }}
                        >
                            &#10008;
                        </Button>
                        <Button
                            title={t('edit') as string}
                            className={cn(classes.itemBtn, classes.itemBtnEdit)}
                            onClick={() => {
                                setModalText(ModalText.edit)
                                showModal()
                            }}
                            transparent
                        >
                            &#10000;
                        </Button>
                        <Button
                            title={t('publishAgain') as string}
                            className={cn(
                                classes.itemBtn,
                                classes.itemBtnPromote,
                            )}
                            transparent
                            onClick={() => {
                                setModalText(ModalText.republish)
                                showModal()
                            }}
                        >
                            &#8679;
                        </Button>
                    </>
                )}
                <Link href={`${Routes.post}/${slug}`} title={title}>
                    <div className={classes.itemImage}>
                        <Image
                            fill={true}
                            style={{ objectFit: 'cover' }}
                            sizes={'(max-width: 768px) 50vw,(max-width: 1024px) 25vw, 200px'}
                            alt={title}
                            src={preview || NO_IMAGE}
                            placeholder='blur'
                            blurDataURL={NO_IMAGE}
                            title={title}
                        />
                    </div>

                    <div className={classes.itemPrice}>
                        <Price price={price} />
                        <h2 className={classes.itemTitle}>{title}</h2>
                        <Image
                            width={24}
                            height={24}
                            alt='favourite'
                            src={favourite ? '/svg/heart-red.svg' : '/svg/heart.svg'}
                            onClick={handleFavourite}
                            className={classes.itemFavourite}
                        />
                    </div>

                </Link>
            </li>
        </>
    )
}
export default Item
