import Layout from '@/components/Layout'
import {GetStaticPostPath} from '@/types'
import {ArticleDTO} from "@/types/ArticleDTO";
import fetchArticle from "@/utils/api/fetchArticle";
import fetchArticles from "@/utils/api/fetchArticles";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GetStaticPaths, GetStaticProps, NextPage} from 'next/types'
import React from 'react'

type Props = {
  article: ArticleDTO,
}

const Article: NextPage<Props> = ({article}) => {
  return (
    <Layout>
      <article className='wysiwyg' dangerouslySetInnerHTML={{__html: article.body}}/>
    </Layout>
  )
}

export default Article

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
    revalidate: 3600,
  }
}

