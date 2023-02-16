import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { InferGetStaticPropsType, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState } from 'react'
import InfinitePosts from 'modules/InfinitePosts'
import { options } from 'utils/options'
import revalidate from 'utils/revalidate'

import MainLayout from 'components/Layout'

const SearchPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const [categoryId, setCategoryId] = useState(
        Number(router.query['categoryId']) || 1,
    )
    return (
        <MainLayout
            title='Поиск в InnoAds'
            description='Ищите объявления города Иннополис в бесплатной доске InnoAds'
        >
            <h1>{t('search')}</h1>
            <hr />
            <select
                className='select-css'
                defaultValue={categoryId}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    setCategoryId(Number(event.target.value))
                }}>
                {options.map(({ value, label }) => <option key={value} value={value}>{t(label)}</option>)}
            </select>
            <hr />
            <InfinitePosts initPage={0} initPosts={[]} options={{ categoryId }} />
        </MainLayout>
    )
}

export default SearchPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'common',
                'search',
            ])),
        },
        revalidate: revalidate,
    }
}
