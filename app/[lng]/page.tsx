import {useTranslation} from '@/app/i18n';
import Categories from '@/components/Categories';
import InfinitePosts from '@/modules/InfinitePosts';
import fetchAds from '@/utils/api/fetchAds';

type Props = {
  params: { lng: string }
}

export default async function Home({params: {lng}}: Props) {
  const {t} = await useTranslation(lng)

  const {content: posts, totalPages} = await fetchAds({
    size: 20,
  })

  return (
    <>
      <Categories/>
      <div className='flex justify-between align-baseline'>
        <h1>{t('lastAds')}</h1>
        <span>{totalPages * 20} {t('ads')}</span>
      </div>
      <InfinitePosts initPosts={posts} initPage={1} options={{}}/>
    </>
  )
}
