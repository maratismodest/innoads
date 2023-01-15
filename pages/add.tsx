import Image from 'next/image'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useRef, useState } from 'react'
import { isDesktop } from 'react-device-detect'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import cn from 'classnames'
import { useAuth } from 'hooks/useAuth'
import slug from 'slug'
import { HTMLInputEvent } from 'types'
import postPost from 'utils/api/postPost'
import postTelegram from 'utils/api/postTelegram'
import { ACCEPTED_IMAGE_FORMAT, defaultValues, FormValues, messages, NO_IMAGE, titles } from 'utils/constants'
import hasCurseWords from 'utils/curseWords'
import getCompressedImagesLinks from 'utils/image/getCompressedImagesLinks'
import { handleDeleteImage } from 'utils/image/handleDeleteImage'
import { MoveImage, moveImage } from 'utils/image/moveImage'
import { options } from 'utils/options'
import { Routes } from 'utils/routes'

import Button from 'components/Button/Button'
import ErrorBlock from 'components/ErrorBlock/ErrorBlock'
import GoToProfile from 'components/GoToProfile/GoToProfile'
import Icon from 'components/Icon/Icon'
import Input from 'components/Input/Input'
import MainLayout from 'components/Layout/Layout'
import Modal from 'components/Modal/Modal'
import Spinner from 'components/Spinner/Spinner'

import classes from 'styles/classes.module.scss'
import selectStyles from 'styles/select.module.scss'


export default function Add() {
    const ref = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const { t } = useTranslation()
    const [images, setImages] = useState<string[]>([])
    const [error, setError] = useState<string | undefined>()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ defaultValues })

    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)

    if (!user) {
        return <GoToProfile />
    }

    const onSubmit = async (data: FormValues) => {

        if (images.length === 0) {
            return setError(messages.noImages)
        }

        if (hasCurseWords(data)) {
            return alert(messages.forbiddenWords)
        }

        const { title, body, price, categoryId } = data

        const formData = {
            title,
            body: body.length > 800 ? body.substring(0, 800) + "..." : body,
            price: Number(price),
            preview: images[0],
            images: images.join('||'),
            slug: slug(title) + '-' + Math.floor(Math.random() * 100),
            telegram: user?.username,
            userId: user?.id,
            categoryId: Number(categoryId),
        }
        try {
            setSending(true)
            await postPost(formData)
            await postTelegram(formData)
            alert('Ваше объявление создано!')
            return router.push(Routes.profile)
        } catch (e) {
            console.log(e)
            if (e instanceof AxiosError) {
                return alert(e.response?.data)
            }
            return
        } finally {
            setSending(false)
        }
    }


    const imageHandler = async (event: HTMLInputEvent) => {
        if (event.target.files) {
            const imagesFromInput = event.target.files
            const length = imagesFromInput.length + images.length
            if (length > 4) {
                return setError('Не больше 4 фотографий!')
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

    return (
        <>
            <Modal visible={sending}>
                <Spinner />
            </Modal>
            <MainLayout title={titles.add}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes.form}
                >
                    <h1>{t('addPost')}</h1>
                    <select
                        className={cn(selectStyles.select, 'select-css')}
                        {...register('categoryId', { required: true })}
                    >
                        {options.map(({ value, label }) => <option key={value}
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
                                onClick={() => {
                                    if (ref.current) {
                                        ref.current.click()
                                    }
                                }}
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
            </MainLayout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
