import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useMemo, useRef, useState } from 'react'
import { isDesktop } from 'react-device-detect'
import { useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import cn from 'classnames'
import { useAuth } from 'hooks/useAuth'
import { HTMLInputEvent, PostInterface } from 'interfaces'
import { ACCEPTED_IMAGE_FORMAT, ErrorProps, NO_IMAGE, Routes, titles } from 'utils/constants'
import antimat from 'utils/functions/antimat'
import { handleDeleteImage } from 'utils/functions/handleDeleteImage'
import handleImageUpload from 'utils/functions/handleImageUpload'
import { handlePostImage } from 'utils/functions/handlePostImage'
import { MoveImage, moveImage } from 'utils/functions/moveImage'
import { options } from 'utils/options'

import Button from 'components/Button/Button'
import GoToProfile from 'components/GoToProfile/GoToProfile'
import Icon from 'components/Icon/Icon'
import Input from 'components/Input/Input'
import MainLayout from 'components/Layout/Layout'
import Modal from 'components/Modal/Modal'
import Spinner from 'components/Spinner/Spinner'

import classes from 'styles/classes.module.scss'
import selectStyles from 'styles/select.module.scss'

export default function Edit({ post }: { post: PostInterface }) {
    const { t } = useTranslation()
    const ref = useRef<HTMLInputElement>(null)
    const { title, body, categoryId, price, id } = post
    const router = useRouter()
    const [images, setImages] = useState<string[]>(() => post.images.split('||'))
    const [error, setError] = useState('')
    const defaultValues = {
        category: options.find((x) => x.value === categoryId)?.value,
        title,
        price,
        body,
    }
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues })
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)

    if (!user || !user.username) {
        return <GoToProfile />
    }

    const onSubmit = async (data: any) => {
        if (images.length === 0) {
            return setError('Добавить хотя бы одно фото!')
        }

        const { title, body, price, category } = data

        const formData = {
            ...post,
            price: Number(price),
            preview: images[0],
            images: images.join('||'),
            categoryId: category,
        }

        if (antimat.containsMat(title) || antimat.containsMat(body)) {
            return alert('Есть запрещенные слова!')
        }
        setSending(true)

        try {
            const token = localStorage.getItem('token')
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/post/${id}`,
                formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            )

            console.log('res', res)

            alert('Ваше объявление изменено!')

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

    const getCompressedImagesLinks = async (imagesFromInput: any) => {
        for (let i = 0; i < imagesFromInput.length; i++) {
            const initialImage = imagesFromInput[i]
            const resizedImage = await handleImageUpload(initialImage)
            if (resizedImage) {
                const formData = new FormData()
                formData.append('image', resizedImage, `${Date.now()}.jpg`)
                const link = await handlePostImage(formData)
                const { status, value } = link
                if (status === 'ok') {
                    setImages((prevState: string[]) => [...prevState, value])
                    setError('')
                }
                if (status === 'error') {
                    setError(value)
                }
            }
        }
    }

    const imageHandler = async (e: HTMLInputEvent) => {
        if (e.target.files) {
            const imagesFromInput = e.target.files
            const length = imagesFromInput.length + images.length
            if (length > 4) {
                return setError('Не больше 4 фотографий!')
            }
            setLoading(true)
            await getCompressedImagesLinks(imagesFromInput)
            setLoading(false)
        }
        return
    }

    const deleteImage = async (current: string) => {
        const res = images.filter((image) => image !== current)
        setImages(res)
        return await handleDeleteImage(current)
    }

    const ErrorBlock = ({ name }: ErrorProps) => <span
        style={{ color: 'red', fontSize: 14, marginBottom: 10 }}>{errors[name] ? t('required') : null}</span>

    return (
        <>
            <Modal visible={sending}>
                <Spinner />
            </Modal>
            <MainLayout title={titles.edit}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes.form}
                >
                    <h1 className={classes.title}>Новое объявление</h1>
                    <select
                        className={cn(selectStyles.select, 'select-css')}
                        {...register('category', { required: true })}
                    >
                        {options.map(({ value, label }) => <option key={value}
                                                                   value={value}>{t(label)}</option>)}
                    </select>
                    <ErrorBlock name={'category'} />
                    <div style={{ marginBottom: 10 }}></div>
                    <Input
                        type='number'
                        placeholder={t('price') as string}
                        register={register}
                        required={true}
                        name='price'
                    />
                    <ErrorBlock name={'price'} />
                    <Input
                        type='text'
                        placeholder={t('header') as string}
                        register={register}
                        required={true}
                        name='title'
                    />
                    <ErrorBlock name={'title'} />
                    <textarea
                        rows={5}
                        cols={5}
                        placeholder={t('description') as string}
                        {...register('body', { required: true })}
                        className={classes.textArea}
                    />
                    <ErrorBlock name={'body'} />
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
                        disabled={sending || loading ? true : false}
                    >Сохранить изменения
                    </Button>
                </form>
            </MainLayout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({
                                                                 locale,
                                                                 query,
                                                             }) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/post/${query.slug}`,
    )
    if (!response) {
        return {
            notFound: true,
        }
    }
    const snapshot = response.data
    return {
        props: {
            post: snapshot,
            slug: snapshot.slug,
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
