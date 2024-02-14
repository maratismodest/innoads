import Categories from '@/components/Categories';
import InfinitePosts from '@/modules/InfinitePosts';
import fetchAds from '@/utils/api/fetchAds';
import fetchCategories from '@/utils/api/fetchCategories';
import { WebSite, WithContext } from 'schema-dts';

export const revalidate = 3600;

const jsonLd: WithContext<WebSite> = {
  ['@context']: 'https://schema.org',
  '@type': 'WebSite',
  name: 'InnoAds',
  alternateName: 'Innopolis Classified',
  url: 'https://innoads.ru',
};

export default async function Home() {
  const { content: posts, totalPages } = await fetchAds({
    size: 20,
  });

  const categories = await fetchCategories();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Categories categories={categories} />
      <div className="flex justify-between align-baseline">
        <h1>Последние объявления</h1>
        {/*<span>{totalPages * 20} объявлений</span>*/}
      </div>
      <InfinitePosts initPosts={posts} initPage={1} options={{}} />
    </>
  );
}
