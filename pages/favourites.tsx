import { GetServerSideProps } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { PostInterface } from 'interfaces'

import Item from 'components/Item/Item'
import MainLayout from 'components/Layout/Layout'

import classes from 'styles/classes.module.scss'

export default function Favourites() {
    const { t } = useTranslation()
    const [favourites] = useLocalStorage()

    return (
        <MainLayout>
            <h1>{t('favourite')}</h1>
            <ul className={classes.items}>
                {favourites.map((post: PostInterface) => {
                    return <Item post={post} key={post.slug} />
                })}
            </ul>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
