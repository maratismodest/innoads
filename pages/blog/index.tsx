import Layout from "@/components/Layout";
import {ArticleDTO} from "@/types/ArticleDTO";
import fetchArticles from "@/utils/api/fetchArticles";
import {seo} from "@/utils/constants";
import revalidate from "@/utils/revalidate";
import {Routes} from "@/utils/routes";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Link from "next/link";
import {GetStaticProps} from "next/types";
import React from 'react';

const Articles = ({articles}: { articles: ArticleDTO[] }) => {
  const {t} = useTranslation()
  return (
    <Layout>
      <h1>{t('blog')}</h1>
      <ul>
        {articles.map((article) =>
          <li key={article.id} className='mb-2'>
            <Link href={Routes.blog + '/' + article.slug}>{article.title}</Link>
          </li>,
        )}
      </ul>
    </Layout>
  );
};

export default Articles;

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const articles = await fetchArticles()
  return {
    props: {
      articles,
      seo: seo.blog,
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: revalidate,
  }
}
