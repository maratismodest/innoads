import Layout from '@/components/Layout'
import type {GetStaticPostPath} from '@/types'
import type {ArticleDTO} from "@/types";
import fetchArticle from "@/utils/api/fetchArticle";
import fetchArticles from "@/utils/api/fetchArticles";
import revalidate from "@/utils/revalidate";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import type {GetStaticPaths, GetStaticProps} from 'next/types'
import React from 'react'

type Props = {
  article: ArticleDTO,
}

export default function Article<NextPage>({article}: Props) {
  const {title, body} = article
  return (
    <Layout title={title}>
      <h1>{title}</h1>
      <article className='wysiwyg' dangerouslySetInnerHTML={{__html: body}}/>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({locales = []}) => {
  const articles = await fetchArticles()
  const paths: GetStaticPostPath[] = articles.flatMap(article =>
    locales.map(locale => ({
      params: {slug: article.slug},
      locale,
    })))
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({params, locale}) => {
  const article = await fetchArticle(params?.slug as string)

  if (!article) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article,
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: revalidate,
  }
}

