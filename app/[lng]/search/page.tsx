'use client'
import {useTranslation} from '@/app/i18n/client';
import Select from '@/components/ui/Select';
import InfinitePosts from '@/modules/InfinitePosts';
import type {Seo} from '@/types';
import {categories, CategoryProps} from '@/utils/categories';
import {useParams, useRouter, useSearchParams} from 'next/navigation';
import React, {useState} from 'react';

// type Props = {
//   seo: Seo
// }

export default function SearchPage() {
  const {t} = useTranslation();
  const searchParams = useSearchParams()
  const search = searchParams.get('categoryId')
  const [category, setCategory] = useState<CategoryProps>(
    categories.find(category => category.value === Number(search)) || categories[0]
  );
  return (
    // <Layout {...seo}>
    <>
      <h1>{t('search')}</h1>
      <hr/>
      <Select onChange={setCategory} defaultValue={category.value}/>
      <hr/>
      {/*<InfinitePosts initPage={0} initPosts={[]} options={{categoryId: 1}}/>*/}
      <InfinitePosts initPage={0} initPosts={[]} options={{categoryId: category.value}}/>
    </>
    // </Layout>
  );
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale as string)),
//       seo: seo.search
//     },
//     revalidate: revalidate
//   };
// };
