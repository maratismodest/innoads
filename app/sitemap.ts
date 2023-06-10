import fetchAds from "@/utils/api/fetchAds";
import {MetadataRoute} from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {content: ads} = await fetchAds({size: 5000})

  const items = ads.map(post => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/post/${post.slug}`,
    lastModified: new Date(),
  }))

  return items

  // return [
  //   {
  //     url: 'https://acme.com',
  //     lastModified: new Date(),
  //   },
  //   {
  //     url: 'https://acme.com/about',
  //     lastModified: new Date(),
  //   },
  //   {
  //     url: 'https://acme.com/blog',
  //     lastModified: new Date(),
  //   },
  // ]
}
