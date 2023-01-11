import Link from 'next/link'
import { GetStaticProps } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login'
import axios from 'axios'
import cn from 'classnames'
import { UserProps } from 'context/AuthContext'
import { useAuth } from 'hooks/useAuth'
import { PostInterface } from 'interfaces'
import * as jose from 'jose'
import fetchPosts from 'utils/api/fetchPosts'
import { titles } from 'utils/constants'
import { Routes } from 'utils/routes'

import Button from 'components/Button/Button'
import Item from 'components/Item/Item'
import MainLayout from 'components/Layout/Layout'

import classes from 'styles/classes.module.scss'
import profile from 'styles/Profile.module.scss'

const error =
    'Вам надо Указать Алиас в Телеграм, иначе вы не сможете подавать объявления! Добавьте алиас у себя в аккаунте, перезагрузите страницу и попробуйте авторизоваться у нас снова'

export default function Profile() {
    const [posts, setPosts] = useState<PostInterface[]>([])
    const { user, login, logout } = useAuth()
    const { t } = useTranslation('profile')

    const handleTelegramResponse = async (response: UserProps) => {
        const { username } = response
        if (!username) {
            return alert({ error })
        }
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, response)
            const decoded = await jose.decodeJwt(data.token)
            console.log('decoded', decoded)
            if (decoded) {
                localStorage.setItem('token', data.token)
                login(response)
            }
            return
        } catch (e) {
            console.log(e)
        }
    }

    const handleClick = async () => {
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
                'first_name': 'Marat',
                'last_name': 'Marat',
                'id': 71233480,
                'photo_url': 'https://t.me/i/userpic/320/QbIbY59Btv3iqvpPSZigwX2LUDfQt39ptyEablKRsgw.jpg',
                'username': 'maratfaizer',
            })
            console.log('data', data)
            const decoded = await jose.decodeJwt(data.token)
            console.log('decoded', decoded)
            if (decoded) {
                localStorage.setItem('token', data.token)
                // @ts-ignore
                login(decoded)
            }
            return
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (user) {
            fetchPosts(0, 0, 10, user.id).then((res) => setPosts(res?.content || []))
        }
    }, [user])

    if (!user) {
        return (
            <MainLayout title={titles.profile}>
                <div className={classes.center}>
                    <h2>{t('authorization')}</h2>

                    {/*<Script async={true}*/}
                    {/*        src={'https://telegram.org/js/telegram-widget.js?21'}*/}
                    {/*        data-telegram-login='InnoAdsPostBot'*/}
                    {/*        data-size='large'*/}
                    {/*        data-onauth="han"*/}
                    {/*        data-request-access='write' />*/}
                    <TelegramLoginButton
                        dataOnauth={handleTelegramResponse}
                        botName='InnoAdsPostBot'
                    />
                    {/*<button onClick={handleClick}>Ok</button>*/}
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout
            title={titles.profile}
            description={titles.profile}
            className={profile.main}
        >
            <h1 className={cn(classes.title)}>{t('cabinet')}</h1>
            {posts.length > 0 ? (
                <ul className={cn(classes.mt40, classes.items)}>
                    {posts.map((post: PostInterface) => (
                        <Item post={post} key={post.id} edit={true} />
                    ))}
                </ul>
            ) : (
                <div className={profile.addBlock}>
                    <Link href={Routes.add}>
                        <Button
                            title={t('addAd', { ns: 'common' }) as string}
                            className={cn(classes.centerBtn, classes.mt20)}
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
                            className={cn(classes.centerBtn, classes.mt20)}
                        >
                            {t('addAd', { ns: 'common' })}
                        </Button>
                    </Link>
                </div>
            )}
            <div className={cn(classes.center, profile.exit)}>
                <Button onClick={logout}>{t('exit')}</Button>
            </div>
        </MainLayout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'common',
                'profile',
            ])),
        },
    }
}
