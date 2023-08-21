import PostPage from '@/components/PostPage';
import fetchAd from '@/utils/api/fetchAd';
import fetchAds from '@/utils/api/fetchAds';
import {categories} from '@/utils/categories';
import {Metadata} from 'next';
import React from 'react';

type Props = {
  params: {
    lng: string
    slug: string;
  };
};

// export const revalidate = 3600

export async function generateMetadata({
                                         params: {slug, lng},
                                       }: Props): Promise<Metadata> {

  const {categoryId, title, body, preview, user} = await fetchAd(slug);
  const category = categories.find((option) => option.value === categoryId) || categories[0]
  return {
    title: `${title.slice(0, 50)} в городе Иннополис`,
    description: body.slice(0, 320),
    // canonical: `${process.env.NEXT_PUBLIC_APP_URL}/post/${slug}`,
    // keywords: `innoads, Иннополис, доска объявлений, ${t(category.label)}`
    // image: preview,
    // authors: `${tgLink}/${user?.username}`
  };
}

export async function generateStaticParams() {
  const {content: posts} = await fetchAds({size: 1000});

  return posts.map((articles) => ({
    slug: articles.slug.toString(),
  }))
}

export default async function Post<NextPage>({params: {slug}}: any) {
  const ad = await fetchAd(slug as string);
  return (
    <PostPage post={ad}/>)
}
