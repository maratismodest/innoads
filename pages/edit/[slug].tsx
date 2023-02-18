import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from 'hooks/useAuth'
import PostFormImages from 'modules/PostForm/PostFormImages'
import { EditPostInterface } from 'types'
import getPostBySlug from 'utils/api/fetchPost'
import updatePost from 'utils/api/updatePost'
import { defaultValues, FormValues, messages, seo } from 'utils/constants'
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
    const editValues: FormValues = {
        ...defaultValues, categoryId: categories.find((x) => x.value === categoryId)?.value || 1, body, title, price,
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ defaultValues: editValues })
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

    const onSubmit = async (data: FormValues) => {
        if (images.length === 0) {
            return
        }

        if (hasCurseWords(data)) {
            return alert(messages.forbiddenWords)
        }

        const { title, body, price, categoryId } = data

        const formData: EditPostInterface = {
            id,
            categoryId: Number(categoryId),
            price: Number(price),
            title,
            body: body.length > 800 ? body.substring(0, 800) + '...' : body,
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
                onSubmit={handleSubmit(onSubmit)}
                className='form'
            >
                <h1>{t('editPost')}</h1>
                <select
                    className='select'
                    {...register('categoryId', { required: true })}
                >
                    {categories.map(({ value, label }) => <option key={value} value={value}>{t(label)}</option>)}
                </select>
                <ErrorBlock name='categoryId' errors={errors} />
                <input
                    className='input'
                    type='number'
                    placeholder={t('price') as string}
                    {...register('price', { required: true })}
                />
                <ErrorBlock name='price' errors={errors} />
                <input
                    className='input'
                    type='text'
                    placeholder={t('header') as string}
                    {...register('title', { required: true })}
                />
                <ErrorBlock name='title' errors={errors} />
                <textarea
                    rows={5}
                    cols={5}
                    placeholder={t('description') as string}
                    {...register('body', { required: true })}
                    className='rounded p-4'
                />
                <ErrorBlock name='body' errors={errors} />
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
