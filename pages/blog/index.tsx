import Layout from '@/components/Layout';
import type { ArticleDTO, Seo } from '@/types';
import fetchArticles from '@/utils/api/fetchArticles';
import { seo, routes, revalidate } from '@/utils/constants';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import type { GetStaticProps } from 'next/types';

type Props = {
  seo: Seo
  articles: ArticleDTO[]
}

export default function Articles<NextPage>({ articles }: Props) {
  const { t } = useTranslation();
  return (
    <Layout {...seo}>
      <h1>{t('blog')}</h1>
      <ul>
        {articles.map((article) =>
          <li key={article.id} className='mb-2'>
            <Link href={routes.blog + '/' + article.slug}>{article.title}</Link>
          </li>
        )}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const articles = await fetchArticles();
  return {
    props: {
      articles,
      seo: seo.blog,
      ...(await serverSideTranslations(locale as string))
    },
    revalidate: revalidate
  };
};
