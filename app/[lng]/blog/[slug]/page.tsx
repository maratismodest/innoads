import {useTranslation} from '@/app/i18n';
import fetchArticle from '@/utils/api/fetchArticle';
import fetchArticles from '@/utils/api/fetchArticles';
import {Metadata} from 'next';
import React from 'react';

export async function generateStaticParams() {
  const articles = await fetchArticles();

  return articles.map(article => ({
    params: {slug: article.slug},
  }))
}

export async function generateMetadata({
                                         params: {slug},
                                       }: any): Promise<Metadata> {
  const article = await fetchArticle(slug);
  return {
    title: article.title,
    description: article.title
  }
}

export default async function Article<NextPage>({params: {lng, slug}}: any) {
  const article = await fetchArticle(slug);
  const {title, body} = article;
  return (
    // <Layout title={title}>
    <>
      <h1>{title}</h1>
      <article className='wysiwyg' dangerouslySetInnerHTML={{__html: body}}/>
    </>
    // </Layout>
  );
}



