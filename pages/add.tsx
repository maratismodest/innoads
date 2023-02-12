import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import PostForm from 'modules/PostForm/PostForm'
import { defaultValues, titles } from 'utils/constants'
import revalidate from 'utils/revalidate'

import Layout from 'components/Layout/Layout'

const Add: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {

    return (
        <Layout title={titles.add}>
            <PostForm
                defaultValues={defaultValues}
            />
        </Layout>
    )
}
export default Add

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
        revalidate:revalidate
    }
}
