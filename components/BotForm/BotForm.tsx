import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { isDesktop } from 'react-device-detect'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import cn from 'classnames'
import { HTMLInputEvent } from 'interfaces'
import { ACCEPTED_IMAGE_FORMAT, defaultValues, FormValues, messages, NO_IMAGE } from 'utils/constants'
import { convertLinksToMedia } from 'utils/convertLinksToMedia'
import { handleDeleteImage } from 'utils/handleDeleteImage'
import handleImageUpload from 'utils/handleImageUpload'
import { handlePostImage } from 'utils/handlePostImage'
import { MoveImage, moveImage } from 'utils/moveImage'
import { translatedOptions } from 'utils/translatedOptions'

import Button from 'components/Button/Button'
import ErrorBlock from 'components/ErrorBlock/ErrorBlock'
import Icon from 'components/Icon/Icon'
import Input from 'components/Input/Input'

import getCompressedImagesLinks from '../../utils/getCompressedImagesLinks'

import classes from 'styles/classes.module.scss'
import selectStyles from 'styles/select.module.scss'

export default function BotForm({ tg }: { tg: any }) {
    const { t } = useTranslation()
    const router = useRouter()
    const { alias } = router.query

    useEffect(() => {
        if (tg) {
            tg.ready()
        }
    }, [tg])
    const ref = useRef<HTMLInputElement>(null)

    const [published, setPublished] = useState(false)
    const [images, setImages] = useState<string[]>([])
    const [error, setError] = useState<string>('')
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        defaultValues,
    })
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)
    const handleAddPhoto = useCallback(() => {
        if (ref.current) {
            ref.current.click()
        }
    }, [ref.current])

    useEffect(() => {
        if (tg) {
            tg.MainButton.setParams({
                text: 'Закрыть окно',
            })
        }

    }, [tg])

    const onSendData = useCallback(() => {
        if (tg) {
            const data = {
                type: 'success',
                text: 'Объявление подано в канал InnoAds',
            }
            tg.sendData(JSON.stringify(data))
        }

    }, [tg])

    useEffect(() => {
        if (tg && onSendData) {
            tg.onEvent('mainButtonClicked', onSendData)
            return () => {
                tg.offEvent('mainButtonClicked', onSendData)
            }
        }

    }, [onSendData, tg])


    const onSubmit = async (data: FormValues) => {
        if (images.length === 0) {
            return setError(messages.noImages)
        }

        setSending(true)

        const formData = {
            body: data.body,
            price: Number(data.price),
            images,
            category: translatedOptions.find(x => x.value === Number(data.categoryId))?.label,
        }

        try {
            const { body, price, images, category } = formData
            const bodyText = body.length > 800 ? body.substring(0, 800) + '...' : body
            const text = `Категория: #${category}\n\n${bodyText} \nЦена: ${price}\n\nавтор: @${alias}`
            const sendPhoto = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_WEB_APP_BOT}/sendMediaGroup?chat_id=${process.env.NEXT_PUBLIC_CHAT_NAME}`
            const media = convertLinksToMedia(images, text)

            await axios.post(sendPhoto, { media })
            reset()
            tg.MainButton.show()
            setPublished(true)
        } catch (e) {
            console.log(e)
            alert(messages.somethingWentWrong)
        } finally {
            setSending(false)
        }
    }

    const imageHandler = async (event: HTMLInputEvent) => {
        if (event.target.files) {
            const imagesFromInput = event.target.files
            const length = imagesFromInput.length + images.length
            if (length > 4) {
                return setError(messages.manyImages)
            }
            setLoading(true)
            await getCompressedImagesLinks(imagesFromInput, setImages)
            setLoading(false)
        }
        return
    }

    const deleteImage = async (current: string) => {
        const res = images.filter((image) => image !== current)
        setImages(res)
        return await handleDeleteImage(current)
    }

    if (!alias) {
        return (
            <h1 style={{ padding: 16 }} className={classes.title}>Что-то пошло не так - я не знаю вашего алиаса</h1>
        )
    }

    if (!published) {
        return (
            <div style={{ padding: 16 }}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes.form}
                >
                    <h1 className={classes.title}>Новое объявление</h1>
                    <select
                        className={cn(selectStyles.select, 'select-css')}
                        {...register('categoryId', { required: true })}
                    >
                        {translatedOptions.map(({ value, label }) => <option key={value}
                                                                             value={value}>{t(label)}</option>)}
                    </select>
                    <ErrorBlock name={'categoryId'} errors={errors} />
                    <Input
                        type='number'
                        placeholder={t('price') as string}
                        register={register}
                        required={true}
                        name='price'
                    />
                    <ErrorBlock name={'price'} errors={errors} />
                    <Input
                        type='text'
                        placeholder={t('header') as string}
                        register={register}
                        required={true}
                        name='title'
                    />
                    <ErrorBlock name={'title'} errors={errors} />
                    <textarea
                        rows={5}
                        cols={5}
                        placeholder={t('description') as string}
                        {...register('body', { required: true })}
                        className={classes.textArea}
                    />
                    <ErrorBlock name={'body'} errors={errors} />
                    <div>
                        <div>
                            <h4>{t('addPhoto')}</h4>
                            <div
                                className={cn({
                                    [classes.image]: isDesktop,
                                    [classes.imageMobile]: !isDesktop,
                                })}
                                onClick={handleAddPhoto}
                            >
                                <Image
                                    alt='image'
                                    src={NO_IMAGE}
                                    fill={true}
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        </div>
                        <Input
                            id='upload'
                            type='file'
                            onChange={imageHandler}
                            hidden
                            multiple
                            accept={ACCEPTED_IMAGE_FORMAT}
                            ref={ref}
                        />
                    </div>
                    <h4>{t('preview')}</h4>
                    <ul
                        className={cn({
                            [classes.images]: isDesktop,
                            [classes.imagesMobile]: !isDesktop,
                        })}
                    >
                        {images.map((image: string, index: number) => {
                            return (
                                <li
                                    key={image}
                                    className={cn({
                                        [classes.image]: isDesktop,
                                        [classes.imageMobile]: !isDesktop,
                                    })}
                                >
                                    <Image
                                        alt={image}
                                        src={image}
                                        style={{
                                            objectFit: 'cover',
                                        }}
                                        fill={true}
                                        placeholder='blur'
                                        blurDataURL={NO_IMAGE}
                                    />
                                    <Icon
                                        className={classes.leftArrow}
                                        onClick={(e: MouseEvent) => {
                                            moveImage(
                                                e,
                                                images,
                                                index,
                                                MoveImage.left,
                                                setImages,
                                            )
                                        }}
                                    >
                                        &larr;
                                    </Icon>
                                    <Icon
                                        className={classes.rightArrow}
                                        onClick={(e: MouseEvent) => {
                                            moveImage(
                                                e,
                                                images,
                                                index,
                                                MoveImage.right,
                                                setImages,
                                            )
                                        }}
                                    >
                                        &rarr;
                                    </Icon>
                                    <Icon
                                        className={classes.deleteIcon}
                                        onClick={async () => {
                                            await deleteImage(image)
                                        }}
                                    >
                                        &times;
                                    </Icon>
                                </li>
                            )
                        })}
                        {loading && (
                            <li
                                className={cn({
                                    [classes.image]: isDesktop,
                                    [classes.imageMobile]: !isDesktop,
                                })}
                            >
                                <p className={classes.loadingImage}>
                                    Загружаем изображение
                                </p>
                            </li>
                        )}
                    </ul>
                    {error}
                    <Button
                        className={classes.mt40}
                        type='submit'
                        disabled={sending || loading}
                    >
                        {t('addAd')}
                    </Button>
                </form>
            </div>
        )
    }

    return (
        <h1 style={{ padding: 16 }} className={classes.title}>Объявление подано! Можно закрыть окно</h1>
    )
}
