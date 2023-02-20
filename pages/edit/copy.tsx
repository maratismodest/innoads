import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from 'hooks/useAuth'
import { FormValues } from 'modules/PostForm/PostForm'
import PostFormImages from 'modules/PostForm/PostFormImages'
import { EditPostInterface } from 'types'
import getPostBySlug from 'utils/api/fetchPost'
import updatePost from 'utils/api/updatePost'
import { CreatePostFormValues, defaultValues, messages, seo } from 'utils/constants'
import hasCurseWords from 'utils/curseWords'
import { categories } from 'utils/options'
import { Routes } from 'utils/routes'

import ErrorBlock from 'components/ErrorBlock'
import Layout from 'components/Layout'
import Modal from 'components/Modal'
import Spinner from 'components/Spinner'

const Edit: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ post, seo }) => {
    const { t } = useTranslation()
    const { categoryId, userId, title, body, price, id, slug, createdAt } = post
    const router = useRouter()
    const { user } = useAuth()
    const [images, setImages] = useState<string[]>(() => post.images.split('||'))
    const editValues: CreatePostFormValues = {
        ...defaultValues, categoryId: categories.find((x) => x.value === categoryId)?.value || 1, body, title, price,
    }
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<CreatePostFormValues>({ defaultValues: editValues })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user) {
            router.push(Routes.profile)
            return
        }
    }, [])

    if (!user) {
        return null
    }

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

        const formData: EditPostInterface = {
            id,
            categoryId: data.categoryId,
            price: data.price,
            title: data.title,
            body: data.body.length > 800 ? data.body.substring(0, 800) + '...' : data.body,
            preview: images[0],
            images: images.join('||'),
            userId,
            slug,
            createdAt,
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


    return (
        <Layout {...seo}>
            <Modal visible={loading}>
                <Spinner />
            </Modal>
            <form
                onSubmit={onSubmit}
                className='form'
            >
                <h1>{t('editPost')}</h1>
                <select
                    className='select'
                    name='categoryId'
                    required={true}
                    defaultValue={editValues.categoryId}
                >
                    {categories.map(({ value, label }) => <option key={value} value={value}>{t(label)}</option>)}
                </select>
                <input
                    className='input mt-4'
                    type='number'
                    placeholder={t('price') as string}
                    name='price'
                    required={true}
                    defaultValue={editValues.price}
                />
                <input
                    className='input mt-4'
                    type='text'
                    placeholder={t('header') as string}
                    name='title'
                    required={true}
                    defaultValue={editValues.title}
                />
                <textarea
                    rows={5}
                    cols={5}
                    placeholder={t('description') as string}
                    name='body'
                    required={true}
                    className='my-4 rounded p-4'
                    defaultValue={editValues.body}
                />
                <PostFormImages images={images} setImages={setImages} />
                <button
                    className='button mt-10'
                    type='submit'
                    disabled={loading}
                >{t('editAd')}
                </button>
            </form>
        </Layout>
    )
}

export default Edit

export const getServerSideProps: GetServerSideProps = async ({
                                                                 locale,
                                                                 query,
                                                             }) => {
    const post = await getPostBySlug(query.slug as string)
    if (!post) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            post,
            seo: seo.edit,
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
