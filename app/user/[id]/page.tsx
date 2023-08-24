import Posts from '@/components/Posts';
import Button from '@/components/ui/Button';
import {GetIdPath} from '@/types';
import fetchPosts from '@/utils/api/fetchAds';
import fetchUser from '@/utils/api/fetchUser';
import fetchUsers from '@/utils/api/fetchUsers';
import {tgLink} from '@/utils/constants';
import {Metadata} from 'next';
import Link from 'next/link';
import React from 'react';

export const revalidate = 86400

export async function generateStaticParams() {
  const users = await fetchUsers();

  return users.map((user) => ({
    id: user.id.toString(),
  }))
}

export async function generateMetadata({
                                         params: {id},
                                       }: GetIdPath): Promise<Metadata> {
  const user = await fetchUser(id);
  return {
    title: `Пользователь ${user.username}`,
    description: `Пользователь ${user.id}`
  }
}

export default async function PublicProfile<NextPage>({params: {id}}: GetIdPath) {
  const user = await fetchUser(id)
  const {content: posts} = await fetchPosts({
    size: 10, userId: id
  });

  return (
    <>
      <h1>Профиль пользователя</h1>
      <p>Количество объявлений: <span>{posts.length}</span></p>
      <Posts posts={posts} className='mt-10'/>
      <Link href={tgLink + '/' + user.username} passHref className='mt-10 block'>
        <Button>Написать пользователю</Button>
      </Link>
    </>
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
