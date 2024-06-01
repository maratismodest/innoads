import InfinitePosts from '@/modules/InfinitePosts';
import SearchModule from '@/modules/SearchModule/SearchModule';
import HomePageCategories from '@/pages-lib/homepage';
import { getAllCategories } from '@/prisma/services/categories';
import fetchPosts from '@/utils/api/prisma/fetchAds';
// import fetchPosts from '@/utils/api/prisma/fetchAds';
import { getMainPageJsonLd } from '@/utils/jsonLd';

export const revalidate = 3600;

export default async function Home<NextPage>() {
  const initPosts = await fetchPosts({ size: 20, published: true });
  // const categories = await getAllCategories();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getMainPageJsonLd()) }}
      />
      <div>
        {/*<Categories categories={categories} />*/}
        <HomePageCategories />
        <SearchModule />
      </div>

      <div className="flex justify-between align-baseline">
        <h1>Последние объявления</h1>
        {/*<span>{totalPages * 20} объявлений</span>*/}
      </div>
      <InfinitePosts initPosts={initPosts} initPage={1} options={{ published: true }} />
    </>
  );
}
