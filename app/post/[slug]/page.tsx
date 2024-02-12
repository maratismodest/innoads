import PostPage from '@/components/PostPage';
import type { GetSlugPath } from '@/types';
import fetchAd from '@/utils/api/fetchAd';
import fetchAds from '@/utils/api/fetchAds';
import fetchCategories from '@/utils/api/fetchCategories';
import { tgLink } from '@/utils/constants';
import mapCategories from '@/utils/mapCategories';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface AdPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: AdPageProps): Promise<Metadata | null> {
  const post = await fetchAd(slug);
  const _categories = await fetchCategories();
  const categories = mapCategories(_categories);
  if (!post) {
    return null;
  }
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
  const { content: posts } = await fetchAds({ size: 1000 });

  return posts.map(({ slug }) => ({ slug }));
}

export const revalidate = 86400;

export default async function Post<NextPage>({ params: { slug } }: GetSlugPath) {
  const post = await fetchAd(slug);
  const _categories = await fetchCategories();
  const categories = mapCategories(_categories);
  if (!post || categories.length === 0) {
    return notFound();
  }
  const { content: related } = await fetchAds({ size: 7, categoryId: post.categoryId });

  return (
    <PostPage post={post} related={related.filter(x => x.id !== post.id)} categories={categories} />
  );
}
