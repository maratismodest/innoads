import Head from 'next/head'
import React, { ReactNode } from 'react'

import Header from 'components/Header/Header'

interface Props {
    title?: string
    description?: string
    image?: string
    categoryId?: string
    price?: string
    children: ReactNode
    className?: string
    canonical?: string
    keywords?: string
    author?: string
    link?: string
}

const Layout: React.FC<Props> = ({
    children,
    title = 'Доска объявлений города Иннополис',
    description = 'Доска объявлений – объявления города Иннополис о продаже и покупке товаров всех категорий. Самый простой способ продать или купить вещи.',
    image = '/icons/icon-192x192.png',
    categoryId,
    price,
    className,
    author = 'InnoAds',
    keywords = 'innoads, Иннополис, доска объявлений',
    canonical = process.env.NEXT_PUBLIC_APP_URL,
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="canonical" href={canonical} />
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
                <meta name="image" content={image} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://innoads.ru/" />
                <meta property="og:image" content={image} />
                <meta name="author" content={author} />
                <link rel="image_src" href={image} />
            </Head>
            <Header />
            <main className={className}>{children}</main>
            <footer />
        </>
    )
}

export default Layout
