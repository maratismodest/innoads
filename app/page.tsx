import Categories from '@/components/Categories';
import InfinitePosts from '@/modules/InfinitePosts';
import fetchAds from '@/utils/api/fetchAds';

type Props = {
  params: { lng: string }
}

export const revalidate = 3600

export default async function Home() {

  const {content: posts, totalPages} = await fetchAds({
    size: 20,
  })

  return (
    <>
      <Categories/>
      <div className='flex justify-between align-baseline'>
        <h1>Последние объявления</h1>
        <span>{totalPages * 20} объявлений</span>
      </div>
      <InfinitePosts initPosts={posts} initPage={1} options={{}}/>
    </>
  )
}
