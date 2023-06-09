import Post from "@/pages-lib/post";
import {PostDTO} from "@/types";
import fetchAd from "@/utils/api/fetchAd";
import fetchAds from "@/utils/api/fetchAds";
import React from 'react'

export default async function PostPage<NextPage>({params}: { params: { slug: string } }) {
  const post = await fetchAd(params?.slug as string)
  const related = await fetchAds({
    categoryId: post.categoryId,
    size: 5,
  })

  return (
    <Post post={post} related={related.content}/>
  )
}

