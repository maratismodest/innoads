import Header from '@/components/Header'
import Button from '@/components/ui/Button';
import {seo, SEO_IMAGE} from '@/utils/constants'
import scrollToTop from '@/utils/scrollToTop';
import Head from 'next/head'
import React, {ReactNode} from 'react'

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

export default function Layout({
                                   children,
                                   title = seo.default.title,
                                   description = seo.default.description,
                                   image = SEO_IMAGE,
                                   className,
                                   author = 'InnoAds',
                                   keywords = 'innoads, Иннополис, доска объявлений',
                                   canonical = process.env.NEXT_PUBLIC_APP_URL,
                                 }: Props) {
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
      <footer className='bg-gray'>
        <Button variant="secondary" className='mx-auto flex justify-center' onClick={scrollToTop}>Up</Button>
      </footer>
    </>
  )
}
