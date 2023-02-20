import type { GetServerSideProps } from 'next'
import { InferGetServerSidePropsType, NextPage } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import PostForm from 'modules/PostForm/PostForm'
import getPostBySlug from 'utils/api/fetchPost'
import { CreatePostFormValues, defaultValues, seo } from 'utils/constants'
import { categories } from 'utils/options'

import Layout from 'components/Layout'

const Edit: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ post, seo }) => {
    const { categoryId, userId, title, body, price, id, slug, createdAt } = post
    const editValues: CreatePostFormValues = {
        ...defaultValues, categoryId: categories.find((x) => x.value === categoryId)?.value || 1, body, title, price,
    }
    return (
        <Layout {...seo}>
            <PostForm defaultValues={editValues} post={post}/>
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
