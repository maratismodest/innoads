import Link from 'next/link'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { PostInterface } from 'interfaces'
import fetchPosts from 'utils/api/fetchPosts'
import fetchUser from 'utils/api/fetchUser'
import { tgLink } from 'utils/constants'
import sortByCreatedAt from 'utils/sortByUpdatedAt'

import Button from 'components/Button/Button'
import Item from 'components/Item/Item'
import MainLayout from 'components/Layout/Layout'

import classes from 'styles/classes.module.scss'

const PublicProfile: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ posts, user }) => {
    const { t } = useTranslation('post')
    return (
        <MainLayout>
            <h1>{t('userProfile')}</h1>
            <p>
                {t('adsCount')}: <span>{posts.length}</span>
            </p>
            <div className={classes.mt40} />
            <ul className={classes.items}>
                {posts.map((post: PostInterface) => <Item post={post} key={post.slug} />)}
            </ul>
            <div className={classes.mt40} />
            <Link href={tgLink + '/' + user.username} passHref>
                <Button>{t('textAuthor')}</Button>
            </Link>
        </MainLayout>
    )
}

export default PublicProfile

export const getServerSideProps: GetServerSideProps = async ({
                                                                 locale,
                                                                 query,
                                                             }) => {
    const userId = Number(query.id)
    const user = await fetchUser(userId)
    const { content: posts } = await fetchPosts(0, 0, 10, userId)

    if (!posts || !user) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            posts: sortByCreatedAt(posts),
            user,
            ...(await serverSideTranslations(locale as string, [
                'common',
                'post',
            ])),
        },
    }
}
