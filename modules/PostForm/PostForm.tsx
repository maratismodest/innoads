import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { useAuth } from 'hooks/useAuth'
import slug from 'slug'
import { EditPostInterface, PostInterface } from 'types'
import postPost from 'utils/api/postPost'
import postTelegram from 'utils/api/postTelegram'
import updatePost from 'utils/api/updatePost'
import { CreatePostFormValues, messages } from 'utils/constants'
import hasCurseWords from 'utils/curseWords'
import { categories } from 'utils/options'
import { Routes } from 'utils/routes'

import Modal from 'components/Modal'
import Spinner from 'components/Spinner'

import PostFormImages from './PostFormImages'

export interface PostFormProps {
    defaultValues: CreatePostFormValues
    post?: PostInterface
}

export type FormValues = {
    title: HTMLInputElement,
    body: HTMLInputElement,
    price: HTMLInputElement,
    categoryId: HTMLSelectElement
}

const PostForm = ({ defaultValues, post }: PostFormProps) => {
    const [images, setImages] = useState<string[]>(() => post ? post.images.split('||') : [])
    const router = useRouter()
    const { t } = useTranslation()

    const { user } = useAuth()
    const [sending, setSending] = useState(false)

    useEffect(() => {
        if (!user) {
            router.push(Routes.profile)
            return
        }
    }, [])

    const onSubmit: React.FormEventHandler<HTMLFormElement & FormValues> = async (event) => {
        event.preventDefault()

        if (images.length === 0) {
            return
        }

        const { title, body, price, categoryId } = event.currentTarget

        const data = {
            title: title.value,
            body: body.value,
            price: Number(price.value),
            categoryId: Number(categoryId.value),
        }

        if (hasCurseWords(data)) {
            return alert(messages.forbiddenWords)
        }

        if (post) {

            const formData: EditPostInterface = {
                id: post.id,
                categoryId: data.categoryId,
                price: data.price,
                title: data.title,
                body: data.body.length > 800 ? data.body.substring(0, 800) + '...' : data.body,
                preview: images[0],
                images: images.join('||'),
                userId: post.userId,
                slug: post.slug,
                createdAt: post.createdAt,
            }
            try {
                setSending(true)
                await updatePost(formData)
                alert(messages.postUpdated)
                return router.push(Routes.profile)
            } catch (e) {
                console.log(e)
                alert(messages.somethingWentWrong)
            } finally {
                setSending(false)
            }

        }

        const formData = {
            title: data.title,
            body: data.body.length > 800 ? data.body.substring(0, 800) + '...' : data.body,
            price: data.price,
            preview: images[0],
            images: images.join('||'),
            slug: slug(data.title) + '-' + Math.floor(Math.random() * 100),
            telegram: user?.username as string,
            userId: user?.id as number,
            categoryId: data.categoryId,
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

    if (!user) {
        return null
    }

    return (
        <>
            <Modal visible={sending}>
                <Spinner />
            </Modal>
            <form
                onSubmit={onSubmit}
                className='form'
            >
                <h1>{t('addPost')}</h1>
                <select
                    className='select'
                    required={true}
                    name='categoryId'
                    defaultValue={defaultValues.categoryId}
                >
                    {categories.map(({ value, label }) =>
                        <option key={value} value={value}>{t(label)}</option>)}
                </select>
                <input
                    required={true}
                    min={1}
                    className='input mt-4'
                    type='number'
                    placeholder={t('price') as string}
                    name='price'
                    defaultValue={defaultValues.price}
                />
                <input
                    className='input mt-4'
                    type='text'
                    placeholder={t('header') as string}
                    required={true}
                    minLength={5}
                    name='title'
                    defaultValue={defaultValues.title}
                />
                <textarea
                    rows={5}
                    cols={5}
                    placeholder={t('description') as string}
                    required={true}
                    minLength={10}
                    className='my-4 rounded p-4'
                    name='body'
                    defaultValue={defaultValues.body}
                />

                <PostFormImages
                    images={images}
                    setImages={setImages}
                />

                <button
                    className='button mt-10'
                    type='submit'
                    disabled={sending}
                >
                    {post ? t('editAd') : t('addAd')}
                </button>
            </form>
        </>
    )
}

export default PostForm
