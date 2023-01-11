import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useCallback, useRef, useState } from 'react'
import { isDesktop } from 'react-device-detect'
import { useForm } from 'react-hook-form'
import cn from 'classnames'
import { useAuth } from 'hooks/useAuth'
import { HTMLInputEvent, PostInterface } from 'interfaces'
import getPostBySlug from 'utils/api/fetchPost'
import updatePost from 'utils/api/updatePost'
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


export default function Edit({ post }: { post: PostInterface }) {
    const { t } = useTranslation()
    const ref = useRef<HTMLInputElement>(null)
    const { categoryId, id, title, body, price } = post
    const router = useRouter()
    const { user } = useAuth()
    const [images, setImages] = useState<string[]>(() => post.images.split('||'))
    const [error, setError] = useState<string | undefined>()
    const editValues: FormValues = {
        ...defaultValues, categoryId: options.find((x) => x.value === categoryId)?.value || 1, body, title, price,
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ defaultValues: editValues })
    const [loading, setLoading] = useState(false)

    const handleAddPhoto = useCallback(() => {
        if (ref.current) {
            ref.current.click()
        }
    }, [ref.current])

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
            ...post,
            categoryId,
            price: Number(price),
            title,
            body,
            images: images.join('||'),
            preview: images[0],
        }

        try {
            setLoading(true)
            await updatePost(formData)
            alert(messages.postUpdated)
            return router.push(Routes.profile)
        } catch (e) {
            console.log(e)
            alert(messages.somethingWentWrong)
        } finally {
            setLoading(false)
        }
    }

    const imageHandler = async (e: HTMLInputEvent) => {
        if (e.target.files) {
            const imagesFromInput: FileList = e.target.files
            const length = imagesFromInput.length + images.length
            if (length > 4) {
                return setError(messages.manyImages)
            }
            setLoading(true)
            await getCompressedImagesLinks(imagesFromInput, setImages)
            setLoading(false)
        }
    }

    const deleteImage = (image: string) => handleDeleteImage(image).then(() => setImages(images.filter((x) => x !== image)))

    return (
        <>
            <Modal visible={loading}>
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
                        {...register('categoryId', { required: true })}
                    >
                        {options.map(({ value, label }) => <option key={value} value={value}>{t(label)}</option>)}
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
                                        onClick={() => deleteImage(image)}
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
                    <span style={{ color: 'red' }}>{error}</span>
                    <Button
                        className={classes.mt40}
                        type='submit'
                        disabled={loading}
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
    const response = await getPostBySlug(query.slug as string)
    if (!response) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            post: response.data,
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
