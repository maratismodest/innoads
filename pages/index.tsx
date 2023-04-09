import Categories from "@/components/Categories";
import Layout from "@/components/Layout";
import InfinitePosts from "@/modules/InfinitePosts";
import {Seo} from "@/types";
import {PostDTO} from "@/types/PostDTO";
import fetchAds from "@/utils/api/fetchAds";
import {seo} from "@/utils/constants";
import {GetStaticProps} from "next";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {NextPage} from "next/types";
import {useMemo} from "react";

type Props = {
  posts: PostDTO[],
  totalPages: number,
  seo: Seo
}

const Home: NextPage<Props> = ({posts, totalPages, seo}) => {
  const {t} = useTranslation()
  const count = useMemo(() => totalPages * 20, [totalPages])
  return (
    <Layout {...seo}>
      <Categories/>
      <div className='flex justify-between align-baseline'>
        <h1>{t('lastAds')}</h1>
        <span>{count} {t('ads')}</span>
      </div>
      <InfinitePosts initPosts={posts} initPage={1} options={{}}/>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const {content: posts, totalPages} = await fetchAds({
    size: 20,
  })

  if (!posts) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      seo: seo.default,
      posts,
      totalPages,
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: 180,
  }
}

