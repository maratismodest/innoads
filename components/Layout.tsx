import Head from 'next/head'
import Link from "next/link";
import React, {ReactNode} from 'react'
import {seo, SEO_IMAGE} from 'utils/constants'

import Header from 'components/Header'

interface Props {
  title?: string
  description?: string
  image?: string
  children: ReactNode
  className?: string
  canonical?: string
  keywords?: string
  author?: string
  link?: string
}

const Layout: React.FC<Props> = ({
                                   children,
                                   title = seo.default.title,
                                   description = seo.default.description,
                                   image = SEO_IMAGE,
                                   className,
                                   author = 'InnoAds',
                                   keywords = 'innoads, Иннополис, доска объявлений',
                                   canonical = process.env.NEXT_PUBLIC_APP_URL,
                                 }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel='canonical' href={canonical}/>
        <meta name='keywords' content={keywords}/>
        <meta name='description' content={description}/>
        <meta name='image' content={image}/>
        <meta property='og:title' content={title}/>
        <meta property='og:description' content={description}/>
        <meta property='og:type' content='website'/>
        <meta property='og:url' content='https://innoads.ru/'/>
        <meta property='og:image' content={image}/>
        <meta name='author' content={author}/>
        <link rel='image_src' href={image}/>
      </Head>
      <Header/>
      <main className={className}>{children}</main>
      <footer className='bg-grey text-black'>
        <nav className='mx-auto flex w-full max-w-[1100px] p-3 justify-center'>
          <Link href='#'>Up</Link>
        </nav>
      </footer>
    </>
  )
}

export default Layout
