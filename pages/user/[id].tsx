import { tgLink } from '../../constants'
import axios from 'axios'
import Button from 'components/Button/Button'
import Item from 'components/Item/Item'
import MainLayout from 'components/MainLayout/MainLayout'
import { getUrl } from 'functions/getUrl'
import { PostInterface } from 'interfaces'
import { orderBy } from 'lodash'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next/types'
import React from 'react'
import classes from 'styles/classes.module.scss'

interface PersonProps {
    posts: PostInterface[]
}

const Person: NextPage<PersonProps> = ({ posts }) => {
    const { t } = useTranslation('post')
    return (
        <MainLayout>
            <h1>{t('userProfile')}</h1>
            <p>
                {t('adsCount')}: <span>{posts.length}</span>
            </p>
            <div className={classes.mt40} />
            <ul className={classes.items}>
                {posts.map((post: PostInterface) => {
                    return <Item post={post} key={post.slug} />
                })}
            </ul>
            <div className={classes.mt40} />
            <Link href={tgLink + '/' + posts[0].telegram} passHref>
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
        getUrl(0, 0, 10, '', +(query.id as string))
    )
    if (!data) {
        return {
            notFound: true,
        }
    }
    const posts = orderBy(data.content, ['createdAt'], ['desc'])
    return {
        props: {
            posts,
            ...(await serverSideTranslations(locale as string, [
                'common',
                'post',
            ])),
        },
    }
}
