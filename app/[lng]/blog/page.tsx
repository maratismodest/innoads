import {useTranslation} from '@/app/i18n';
import Layout from '@/components/Layout';
import type {ArticleDTO, Seo} from '@/types';
import fetchArticles from '@/utils/api/fetchArticles';
import {seo, routes, revalidate} from '@/utils/constants';
import {Metadata} from 'next';
import Link from 'next/link';
import type {GetStaticProps} from 'next/types';

type Props = {
  seo: Seo
  articles: ArticleDTO[]
}

export const metadata: Metadata = {
  title: seo.blog.title,
  description: seo.blog.description,
}

export default async function Articles<NextPage>({params: {lng}}: any) {
  const articles = await fetchArticles();
  const {t} = await useTranslation(lng)
  return (
    <>
      <h1>{t('blog')}</h1>
      <ul>
        {articles.map((article) =>
          <li key={article.id} className='mb-2'>
            <Link href={routes.blog + '/' + article.slug}>{article.title}</Link>
          </li>
        )}
      </ul>
    </>
  );
};
