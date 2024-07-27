import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Posts from '@/components/Posts';
import { getUserById } from '@/prisma/services/users';
import buttonStyles from '@/styles/buttonStyles';
import { GetIdPath } from '@/types';
import fetchPosts from '@/utils/api/prisma/fetchAds';
import fetchUsers from '@/utils/api/prisma/fetchUsers';
import { tgLink } from '@/utils/constants';
import { getPersonJsonLd } from '@/utils/jsonLd';

export const generateStaticParams = async () => {
  const users = await fetchUsers({});
  const posts = await fetchPosts({ size: 2000 });
  return users
    .filter(user => posts.some(post => post.userId === user.id))
    .map(user => ({ id: user.id }));
};

export const generateMetadata = async ({ params: { id } }: GetIdPath): Promise<Metadata | null> => {
  const user = await getUserById(id);
  if (!user) return null;

  return {
    title: `Пользователь ${user.username}`,
    description: `Пользователь ${user.id}`,
  };
};

export const revalidate = 86400;

const PublicProfile = async ({ params: { id } }: GetIdPath) => {
  const user = await getUserById(id);
  if (!user) notFound();

  const posts = await fetchPosts({ userId: id, published: true });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getPersonJsonLd(user)) }}
      />
      <h1>Профиль пользователя</h1>
      <p>
        Количество объявлений: <span>{posts.length}</span>
      </p>
      <Posts posts={posts} className="mt-10" />
      <Link href={`${tgLink}/${user.username}`} className={clsx(buttonStyles(), 'mt-8 block')}>
        Написать пользователю
      </Link>
    </>
  );
};

export default PublicProfile;
