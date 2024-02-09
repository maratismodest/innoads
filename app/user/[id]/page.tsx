import Posts from '@/components/Posts';
import Button from '@/components/ui/Button';
import buttonStyles from '@/styles/buttonStyles';
import { GetIdPath } from '@/types';
import fetchPosts from '@/utils/api/fetchAds';
import fetchUser from '@/utils/api/fetchUser';
import fetchUsers from '@/utils/api/fetchUsers';
import { tgLink } from '@/utils/constants';
import { clsx } from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export async function generateStaticParams() {
  const users = await fetchUsers();

  return users.map(user => ({
    id: user.id.toString(),
  }));
}

export async function generateMetadata({ params: { id } }: GetIdPath): Promise<Metadata | null> {
  const user = await fetchUser(id);
  if (!user) {
    return null;
  }
  return {
    title: `Пользователь ${user.username}`,
    description: `Пользователь ${user.id}`,
    // robots: {
    //   index: false,
    //   follow: true,
    // },
  };
}

export const revalidate = 86400;

export default async function PublicProfile<NextPage>({ params: { id } }: GetIdPath) {
  const user = await fetchUser(id);
  if (!user) {
    return notFound();
  }
  const { content: posts } = await fetchPosts({
    userId: id,
    size: 50,
  });

  return (
    <>
      <h1>Профиль пользователя</h1>
      <p>
        Количество объявлений: <span>{posts.length}</span>
      </p>
      <Posts posts={posts} className="mt-10" />
      <Link href={tgLink + '/' + user.username} className={clsx(buttonStyles(), 'mt-10 block')}>
        Написать пользователю
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
