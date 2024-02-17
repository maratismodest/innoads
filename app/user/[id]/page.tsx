import Posts from '@/components/Posts';
import buttonStyles from '@/styles/buttonStyles';
import { GetIdPath } from '@/types';
import fetchPosts from '@/utils/api/fetchAds';
import fetchUser from '@/utils/api/fetchUser';
import fetchUsers from '@/utils/api/fetchUsers';
import { tgLink } from '@/utils/constants';
import { getPersonJsonLd } from '@/utils/jsonLd';
import clsx from 'clsx';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
  const { content: posts } = await fetchPosts({ userId: id });

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
      <a href={tgLink + '/' + user.username} className={clsx(buttonStyles(), 'mt-8 block')}>
        Написать пользователю
      </a>
    </>
  );
}
