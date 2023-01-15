import Link from "next/link";
import {useRouter} from "next/router";
import {GetStaticProps} from 'next/types'
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import React from 'react'

import Layout from 'components/Layout/Layout'


const Blog = () => {
    const {pathname} = useRouter()
    const {t} = useTranslation()
    const canonical = `${process.env.NEXT_PUBLIC_APP_URL}/blog`
    const links = [
        {
            title: "Как выгодно продать на досках объявлений",
            href: pathname + '/post'
        },
        {
            title: 'Правила',
            href: pathname + '/rules'
        },
        {
            title: 'Пользовательское соглашение',
            href: pathname + '/agreement'
        },
        {
            title: 'Удалить пользователя',
            href: pathname + '/delete'
        }
    ]
    return (
        <Layout
            title='Блог сайта InnoAds'
            description='В этом разделе публикуется важная информация'
            canonical={canonical}
        >
            <h1>Блог</h1>
            <ul>
                {links.map(x => <li key={x.href} style={{marginBottom:8}}><Link href={x.href}>{x.title}</Link></li>)}
            </ul>
        </Layout>
    )
}

export default Blog

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
