import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login'
import axios from 'axios'
import { clsx } from 'clsx'
import { useAuth } from 'hooks/useAuth'
import * as jose from 'jose'
import { PostInterface, TelegramUserProps } from 'types'
import client from 'utils/api/createRequest'
import fetchPosts from 'utils/api/fetchPosts'
import { titles } from 'utils/constants'
import revalidate from 'utils/revalidate'
import { Routes } from 'utils/routes'

import Button from 'components/Button/Button'
import Item from 'components/Item/Item'
import Layout from 'components/Layout/Layout'

import classes from 'styles/classes.module.scss'
import profile from 'styles/Profile.module.scss'

const error =
    'Вам надо Указать Алиас в Телеграм, иначе вы не сможете подавать объявления! Добавьте алиас у себя в аккаунте, перезагрузите страницу и попробуйте авторизоваться у нас снова'

const Profile: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
    const [posts, setPosts] = useState<PostInterface[]>([])
    const { user, login, logout } = useAuth()
    const { t } = useTranslation('profile')

    const handleTelegramResponse = async ({ username, id }: TelegramUserProps) => {
        if (!username) {
            return alert({ error })
        }
        try {
            const user = { id, username }
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, user)
            const decoded = await jose.decodeJwt(data.token)
            // console.log('decoded', decoded)
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

    const handleClick = async () => {
        const userTemplate: TelegramUserProps = {
            first_name: 'Marat',
            last_name: 'Faizerakhmanov',
            id: 71233480,
            photo_url: 'https://t.me/i/userpic/320/QbIbY59Btv3iqvpPSZigwX2LUDfQt39ptyEablKRsgw.jpg',
            username: 'maratfaizer',
        }
        const { id, username } = userTemplate
        try {
            const user = { id, username }
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, user)
            // console.log('data', data)
            const decoded = await jose.decodeJwt(data.token)
            // console.log('decoded', decoded)
            if (decoded) {
                localStorage.setItem('token', data.token)
                client.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
                // @ts-ignore
                login(user)
            }
            return
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (user) {
            fetchPosts({
                size: 10,
                userId: user.id,
            }).then((res) => setPosts(res?.content || []))
        }
    }, [user])

    if (!user) {
        return (
            <Layout title={titles.profile}>
                <div className={'center'}>
                    <h2>{t('authorization')}</h2>
                    <TelegramLoginButton
                        dataOnauth={handleTelegramResponse}
                        botName='InnoAdsPostBot'
                    />
                    {process.env.NEXT_PUBLIC_NODE_ENV == 'development' && <Button onClick={handleClick}>Ok</Button>}
                </div>
            </Layout>
        )
    }

    return (
        <Layout
            title={titles.profile}
            description={titles.profile}
            className={profile.main}
        >
            <h1>{t('cabinet')}</h1>
            {posts.length > 0 ? (
                <ul className={clsx(classes.mt40, classes.items)}>
                    {posts.map((post: PostInterface) => (
                        <Item post={post} key={post.id} edit={true} />
                    ))}
                </ul>
            ) : (
                <div className={profile.addBlock}>
                    <Link href={Routes.add}>
                        <Button
                            title={t('addAd', { ns: 'common' }) as string}
                            className={clsx(classes.centerBtn, classes.mt20)}
                        >
                            &#43;
                        </Button>
                    </Link>
                    <p>
                        Опубликуйте объявление, и его увидят потенциальные
                        покупатели
                    </p>
                    <Link href={Routes.add}>
                        <Button
                            title={t('addAd', { ns: 'common' }) as string}
                            className={clsx(classes.centerBtn, classes.mt20)}
                        >
                            {t('addAd', { ns: 'common' })}
                        </Button>
                    </Link>
                </div>
            )}
            <div className={clsx(classes.center, profile.exit)}>
                <Button onClick={logout}>{t('exit')}</Button>
            </div>
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
