import Item from '@/components/Item';
import PostPage from '@/components/PostPage';
import Index from '@/components/Price';
import ShareButton from '@/pages-lib/post/ShareButton';
import { getAllCategories } from '@/prisma/services/categories';
import buttonStyles from '@/styles/buttonStyles';
import type { GetSlugPath } from '@/types';
import fetchAd from '@/api/prisma/fetchAd';
import fetchAds from '@/api/prisma/fetchAds';
import { routes, tgLink } from '@/utils/constants';
import { getPostJsonLd } from '@/utils/jsonLd';
import mapCategories from '@/utils/mapCategories';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

interface AdPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: AdPageProps): Promise<Metadata | null> {
  const post = await fetchAd(slug);

  if (!post) {
    return {
      title: 'Post not found',
      description: 'The requested post does not exist.',
    };
  }

  const _categories = await getAllCategories();

  if (!_categories.length) {
    return {
      title: 'Categories not found',
      description: 'The requested categories does not exist.',
    };
  }

  const categories = mapCategories(_categories);

  const { categoryId, title, body, preview, user } = post;
  const category = categories.find(option => option.value === categoryId) || categories[0];
  const metaTitle = `${category.label} ${title.slice(0, 50)} ${process.env.NEXT_PUBLIC_META_ADDITIONAL ?? ''}`;

  return {
    title: metaTitle,
    description: body.slice(0, 320),
    authors: [{ name: user.username, url: `${tgLink}/${user.username}` }],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/post/${slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: body.slice(0, 320),
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/post/${slug}`,
      siteName: process.env.NEXT_PUBLIC_APP_NAME,
      images: preview,
      locale: 'ru',
    },
  };
}

export async function generateStaticParams() {
  const posts = await fetchAds({ size: 1000 });

  return posts.map(({ slug }) => ({ slug }));
}

export const revalidate = 3600;

export default async function Post<NextPage>({ params: { slug } }: GetSlugPath) {
  const post = await fetchAd(slug);
  console.log('post', post);
  const _categories = await getAllCategories();
  const categories = mapCategories(_categories);
  if (!post || categories.length === 0) {
    return notFound();
  }
  // const related = await fetchRelatedAds({ categoryId: post.categoryId });

  const { categoryId, title, body, preview, user, price, createdAt } = post;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getPostJsonLd(post)) }}
      />
      <div className="relative mx-auto w-full max-w-[400px]">
        <PostPage post={post} />
        <Link href={`${routes.main}search?categoryId=${categoryId}`}>
          Категория: {categories.find(x => x.value === categoryId)?.label}
        </Link>
        <h1>{title}</h1>
        <Index price={price} />
        <hr />
        <p className="break-words">{body}</p>
        <time className="mt-5">Опубликовано: {dayjs(createdAt).format('DD.MM.YYYY')}</time>
        <a
          href={tgLink + '/' + post.user.username}
          target="_blank"
          className={clsx(buttonStyles(), 'mt-8 !block')}
        >
          Написать автору
        </a>
        <Link href={`/user/${post.userId}`} className={clsx(buttonStyles(), 'mt-8 !block')}>
          Все объявления автора
        </Link>
        <ShareButton post={post} />
        {/*{related.length > 0 && (*/}
        {/*  <div className="mt-10">*/}
        {/*    <h2>Похожие объявления</h2>*/}
        {/*    <ul className="grid grid-cols-2 gap-4">*/}
        {/*      {related.slice(0, 4).map((post: PostDTO) => (*/}
        {/*        <li key={post.slug}>*/}
        {/*          <Item post={post} />*/}
        {/*        </li>*/}
        {/*      ))}*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </>
  );
}
