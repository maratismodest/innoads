import Home from "@/pages-lib/home";
import fetchAds from "@/utils/api/fetchAds";

async function getStaticProps() {
  const {content: posts, totalPages} = await fetchAds({
    size: 20,
  })

  return {
    posts,
    totalPages,
  }
}


// export const metadata: Metadata = seo.default

export default async function HomePage() {
  const {totalPages, posts} = await getStaticProps()
  return (
    <Home totalPages={totalPages} posts={posts}/>
  );
};
