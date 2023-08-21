import {useTranslation} from '@/app/i18n';
import Posts from '@/components/Posts';
import Button from '@/components/ui/Button';
import type {PostDTO, UserDTO} from '@/types';
import fetchPosts from '@/utils/api/fetchAds';
import fetchUser from '@/utils/api/fetchUser';
import fetchUsers from '@/utils/api/fetchUsers';
import {tgLink} from '@/utils/constants';
import Link from 'next/link';
import React from 'react';

type Props = {
  user: UserDTO,
  posts: PostDTO[]
}

export async function generateStaticParams() {
  const users = await fetchUsers();

  return users.map((user) => ({
    id: user.id.toString(),
  }))
}

export default async function PublicProfile<NextPage>({params: {id, lng}}: any) {
  const {t} = await useTranslation()
  const user = await fetchUser(id)
  const {content: posts} = await fetchPosts({
    size: 10, userId: id
  })

  return (
    // <Layout title={`Пользователь ${user.username}`}
    //         description={`Пользователь ${user.username} c ${posts.length} объявлениями`}
    // >
    <>
      <h1>{t('userProfile')}</h1>
      <p>{t('adsCount')}: <span>{posts.length}</span></p>
      <Posts posts={posts} className='mt-10'/>
      <Link href={tgLink + '/' + user.username} passHref className='mt-10 block'>
        <Button>{t('textAuthor')}</Button>
      </Link>
    </>
    // </Layout>
  );
}

// export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
//   const users = await fetchUsers();
//   const paths: GetStaticPath[] = users.flatMap(user =>
//     locales.map(locale => ({
//       params: { id: user.id.toString() },
//       locale
//     })));
//   return {
//     paths,
//     fallback: false
//   };
// };
// export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
//   const userId = Number(params?.id);
//   const user = await fetchUser(userId);
//   const { content: posts } = await fetchPosts({
//     size: 10, userId
//   });
//   if (!posts || !user) {
//     return {
//       notFound: true
//     };
//   }
//   return {
//     props: {
//       posts: sortByCreatedAt(posts),
//       user,
//       ...(await serverSideTranslations(locale as string))
//     },
//     revalidate: revalidate
//   };
// };
