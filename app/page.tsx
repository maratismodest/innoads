import Home from "@/pages-lib/home";
import fetchAds from "@/utils/api/fetchAds";
import {seo} from "@/utils/constants";
import {Metadata} from "next";

export const metadata: Metadata = seo.default

export default async function HomePage() {
  const {content: posts, totalPages} = await fetchAds({
    size: 20,
  })
  return (
    <Home totalPages={totalPages} posts={posts}/>
  );
};
