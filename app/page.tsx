import InfinitePosts, { InitOptions } from '@/modules/InfinitePosts';
import SearchModule from '@/modules/SearchModule/SearchModule';
import HomePageCategories from '@/pages-lib/homepage';
import fetchPosts from '@/utils/api/prisma/fetchAds';
import { getMainPageJsonLd } from '@/utils/jsonLd';

export const revalidate = 3600;

const initOptions: InitOptions = { size: 20, published: true, page: 0 };

export default async function Home<NextPage>() {
  const initPosts = await fetchPosts(initOptions);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getMainPageJsonLd()) }}
      />
      <div>
        <HomePageCategories />
        <SearchModule />
      </div>

      <div className="flex justify-between align-baseline">
        <h1>Последние объявления</h1>
        {/*<span>{totalPages * 20} объявлений</span>*/}
      </div>
      <InfinitePosts
        initPosts={initPosts}
        initOptions={{ ...initOptions, page: initOptions.page + 1 }}
      />
    </>
  );
}
