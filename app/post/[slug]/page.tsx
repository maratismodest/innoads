import Post from "@/pages-lib/post";
import fetchAd from "@/utils/api/fetchAd";
import fetchAds from "@/utils/api/fetchAds";
import {Metadata} from "next";
import React from 'react'

interface Props {
  params: { slug: string }
}

export async function generateMetadata(
  {params}: Props,
): Promise<Metadata> {
  const {title, body} = await fetchAd(params?.slug as string)

  return {
    title,
    description: body
  }
}

export default async function PostPage<NextPage>({params}: Props) {
  const post = await fetchAd(params?.slug as string)
  const related = await fetchAds({
    categoryId: post.categoryId,
    size: 5,
  })

  return (
    <Post post={post} related={related.content}/>
  )
}

