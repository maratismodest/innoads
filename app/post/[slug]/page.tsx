import PostPage from '@/components/PostPage';
import fetchAd from '@/utils/api/fetchAd';
import fetchAds from '@/utils/api/fetchAds';
import {categories} from '@/utils/categories';
import {tgLink} from '@/utils/constants';
import {Metadata} from 'next';
import React from 'react';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
                                         params: {slug},
                                       }: Props): Promise<Metadata> {

  const {categoryId, title, body, preview, user} = await fetchAd(slug);
  const category = categories.find((option) => option.value === categoryId) || categories[0]
  return {
    title: `${category.label} ${title.slice(0, 50)} в городе Иннополис`,
    description: body.slice(0, 320),
    authors: [{name: user.username, url: `${tgLink}/${user?.username}`}],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/post/${slug}`,
    },
    openGraph: {
      title: `${title.slice(0, 50)} в городе Иннополис`,
      description: body.slice(0, 320),
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/post/${slug}`,
      siteName: 'InnoAds',
      images: preview,
      locale: 'ru',
    },
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
  const {content: related} = await fetchAds({size: 6, categoryId: ad.categoryId})
  return (
    <PostPage post={ad} related={related.filter(x => x.id == ad.id)}/>)
}
