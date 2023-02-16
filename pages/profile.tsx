import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useCallback, useEffect, useState } from 'react'
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login'
import { useAuth } from 'hooks/useAuth'
import * as jose from 'jose'
import { PostInterface, TelegramUserProps } from 'types'
import client from 'utils/api/createRequest'
import fetchPosts from 'utils/api/fetchPosts'
import { titles } from 'utils/constants'
import revalidate from 'utils/revalidate'
import { Routes } from 'utils/routes'

import Button from 'components/Button'
import Layout from 'components/Layout'
import Posts from 'components/Posts'
import Spinner from 'components/Spinner'

const error = 'Добавьте алиас у себя в аккаунте / Add alias into your account!'

const Profile: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
    const [posts, setPosts] = useState<PostInterface[]>([])
    const [fetching, setFetching] = useState(false)
    const { user, login, logout } = useAuth()
    const { t } = useTranslation('profile')

    const handleTelegram = async ({ username, id }: TelegramUserProps) => {
        if (!username) {
            return alert({ error })
        }
        try {
            const user = { id, username }
            const { data } = await client.post('/users/login', user)
            const decoded = jose.decodeJwt(data.token)
            if (decoded) {
                localStorage.setItem('token', data.token)
                client.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
                login(user)
            }
            return
        } catch (e) {
            console.log(e)
        }
    }

    const handleTelegramImitate = useCallback(async () => {
        const userTemplate: TelegramUserProps = {
            first_name: process.env.NEXT_PUBLIC_FIRST_NAME as string,
            last_name: process.env.NEXT_PUBLIC_LAST_NAME as string,
            id: Number(process.env.NEXT_PUBLIC_ID),
            photo_url: process.env.NEXT_PUBLIC_PHOTO_URL as string,
            username: process.env.NEXT_PUBLIC_USERNAME as string,
        }
        try {
            const user = { id: userTemplate.id, username: userTemplate.username }
            const { data } = await client.post('/users/login', user)
            const decoded = await jose.decodeJwt(data.token)
            if (decoded) {
                localStorage.setItem('token', data.token)
                client.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
                // @ts-ignore
                login(user)
            }
        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        if (user) {
            setFetching(true)
            fetchPosts({ userId: user.id }).then(({ content }) => setPosts(content)).catch(e => alert(e.message)).finally(() => setFetching(false))
        }
    }, [user])

    if (!user) {
        return (
            <Layout title={titles.profile}>
                <div className='flex flex-col items-center'>
                    <h2>{t('authorization')}</h2>
                    <TelegramLoginButton
                        dataOnauth={handleTelegram}
                        botName='InnoAdsPostBot'
                    />
                    {process.env.NEXT_PUBLIC_NODE_ENV == 'development' &&
                        <Button onClick={handleTelegramImitate}>Imitate</Button>}
                </div>
            </Layout>
        )
    }

    return (
        <Layout
            title={titles.profile}
            description={titles.profile}
            className='flex flex-col items-center gap-8'
        >
            <div className='text-center'>
                <h1>{t('cabinet')}</h1>
                <p>{t('addAds')}</p>
            </div>
            <Link href={Routes.add}>
                <Button>&#43;</Button>
            </Link>
            {fetching && <Spinner />}
            {posts.length > 0 && !fetching && <Posts posts={posts} edit={true} />}
            <Button onClick={logout}>{t('exit')}</Button>
        </Layout>
    )
}
export default Profile

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'common',
                'profile',
            ])),
        },
        revalidate: revalidate,
    }
}
