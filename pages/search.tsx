import Layout from '@/components/Layout';
import Select from '@/components/ui/Select';
import InfinitePosts from '@/modules/InfinitePosts';
import type { Seo } from '@/types';
import { categories, CategoryProps } from '@/utils/categories';
import { seo, revalidate } from '@/utils/constants';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

type Props = {
  seo: Seo
}

export default function SearchPage<NextPage>({ seo }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const [category, setCategory] = useState<CategoryProps>(
    categories.find(category => category.value === Number(router.query['categoryId'])) || categories[0]
  );

  return (
    <Layout {...seo}>
      <h1>{t('search')}</h1>
      <hr />
      <Select onChange={setCategory} defaultValue={category.value} />
      <hr />
      <InfinitePosts initPage={0} initPosts={[]} options={{ categoryId: category.value }} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
      seo: seo.search
    },
    revalidate: revalidate
  };
};
