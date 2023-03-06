import {GetStaticPaths, GetStaticProps, NextPage} from 'next/types'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GetStaticPath} from '@/types'
import {BlogPost} from '@/types/BlogDTO'
import {getAllPostIds, getPostData} from '@/utils/blogParse'
import revalidate from '@/utils/revalidate'

import Layout from '@/components/Layout'

const BlogPost: NextPage<Props> = ({postData}) => {
  return (
    <Layout
      title={postData.title}
      description={postData.description}
    >
      <div dangerouslySetInnerHTML={{__html: postData.contentHtml as string}}/>
    </Layout>
  )
}

type Props = {
  postData: BlogPost
}

export default BlogPost

export const getStaticPaths: GetStaticPaths = async ({locales = []}) => {
  const initPaths = getAllPostIds()
  const paths: GetStaticPath[] = initPaths.flatMap(initPath =>
    locales.map(locale => ({
      params: {id: initPath.params.id.toString()},
      locale,
    })))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({params, locale}) => {
  const postData = await getPostData(params?.id as string)

  return {
    props: {
      postData,
      ...(await serverSideTranslations(locale as string))
    },
    revalidate: revalidate,
  }
}
