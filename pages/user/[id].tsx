import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import axios from 'axios'
import { PostInterface, UserType } from 'interfaces'
import * as process from 'process'
import { tgLink } from 'utils/constants'
import { getUrl } from 'utils/getUrl'
import { sortByCreatedAt } from 'utils/sortByUpdatedAt'

import Button from 'components/Button/Button'
import Item from 'components/Item/Item'
import MainLayout from 'components/Layout/Layout'

import classes from 'styles/classes.module.scss'

interface PersonProps {
    posts: PostInterface[]
    user: UserType
}

const Person: NextPage<PersonProps> = ({ posts, user }) => {
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

export default Person

export const getServerSideProps: GetServerSideProps = async ({
                                                                 locale,
                                                                 query,
                                                             }) => {
    const { data } = await axios.get(
        getUrl(0, 0, 10, '', +(query.id as string)),
    )
    const {data: user} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${query.id as string}`)
    if (!data) {
        return {
            notFound: true,
        }
    }
    const posts: PostInterface[] = sortByCreatedAt(data.content)
    // const posts: PostInterface[] = sortByCreatedAt(data)
    return {
        props: {
            posts,
            user,
            ...(await serverSideTranslations(locale as string, [
                'common',
                'post',
            ])),
        },
    }
}
